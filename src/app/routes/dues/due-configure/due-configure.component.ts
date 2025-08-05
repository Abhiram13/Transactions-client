import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormModule } from '../../../modules/form.module';
import { CommonModule, Location } from '@angular/common';
import { MatFieldDirective } from '../../../directives/directives';
import { BankNS, StatusCode, DueConfigureNS } from '../../../types/export.types';
import { BankService } from '../../../services/bank.service';
import { DueService } from '../../../services/due.service';
import { ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';

type Payload = DueConfigureNS.IInsertPayload;
type UpdatePayload = {id: string} & Payload;

@Component({
    selector: 'app-due-configure',
    standalone: true,
    providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, DueService],
    imports: [FormModule, CommonModule, MatFieldDirective],
    templateUrl: './due-configure.component.html',
    styleUrl: './due-configure.component.scss'
})
export class DueConfigureComponent implements OnInit {
    private _dueId: string = "";
    private _due: Payload = {} as Payload;
    private _type: 'add' | 'update' = 'add';
    public title: string = "Add";
    public formGroup!: FormGroup;
    public banks: BankNS.IList[] = [];
    public todayDate: Date = new Date();

    @ViewChild("formDirective")
    public formDirective!: FormGroupDirective;

    constructor(
        private readonly _builder: FormBuilder, 
        private readonly _bankService: BankService, 
        private readonly _dueService: DueService,
        private readonly _activeRoute: ActivatedRoute,
        private readonly _footer: FooterService,
        private readonly _location: Location
    ) {
        this.formGroup = this._builder.group({
            principal_amount: ['', [Validators.required]],
            description: ['', [Validators.required]],
            status: ['', [Validators.required]],
            to_bank: [''],
            payee: ['', [Validators.required]],
            start_date: ['', [Validators.required]],
            comment: [''],
            type: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this._dueId = this._activeRoute.snapshot.params?.['dueId'];
        this._fetchBanks();

        if (this._dueId) {
            this._type = 'update';
            this.title = "Update";
            this._fetchDue();
        }
    }

    protected _fetchDue(): void {
        this._dueService.searchById<Payload>(this._dueId).subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this._due = response.result || {} as Payload;
                this._setDueForm();
            }
        });
    }

    private _setDueForm(): void {
        this.formGroup.get("principal_amount")?.setValue(this._due.principal_amount);
        this.formGroup.get("description")?.setValue(this._due.description);
        this.formGroup.get("status")?.setValue(`${this._due.status}`);
        this.formGroup.get("to_bank")?.setValue(this._due.to_bank);
        this.formGroup.get("payee")?.setValue(this._due.payee);
        this.formGroup.get("start_date")?.setValue(this._due.start_date);
        this.formGroup.get("comment")?.setValue(this._due.comment);
        this.formGroup.get("type")?.setValue(`${this._due.type}`);
    }

    protected _fetchBanks(): void {
        this._bankService.list<BankNS.IList[]>().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.banks = response?.result || [];
            }
        });
    }

    public get principal_amount(): FormControl {
        return this.formGroup.get("principal_amount") as FormControl;
    }

    public get status(): FormControl {
        return this.formGroup.get("status") as FormControl;
    }

    public get type(): FormControl {
        return this.formGroup.get("type") as FormControl;
    }

    public get description(): FormControl {
        return this.formGroup.get("description") as FormControl;
    }

    public get to_bank(): FormControl {
        return this.formGroup.get("to_bank") as FormControl;
    }

    public get payee(): FormControl {
        return this.formGroup.get("payee") as FormControl;
    }

    public get start_date(): FormControl {
        return this.formGroup.get("start_date") as FormControl;
    }

    public get comment(): FormControl {
        return this.formGroup.get("comment") as FormControl;
    }

    public onSubmit(): void {
        const payload: Payload = {
            principal_amount: Number(this.formGroup.get('principal_amount')?.value),
            description: this.formGroup.get('description')?.value,
            status: Number(this.formGroup.get('status')?.value),
            to_bank: this.formGroup.get('to_bank')?.value,
            comment: this.formGroup.get('comment')?.value,
            payee: this.formGroup.get('payee')?.value,
            start_date: new Date(this.formGroup.get('start_date')?.value).toISOString(),
            type: Number(this.formGroup.get('type')?.value),
        };

        if (this._type === 'update') {
            this._dueService.update<UpdatePayload>(this._dueId, {
                ...payload,
                id: this._dueId
            }).subscribe(response => {
                if (response?.status_code === StatusCode.CREATED) {
                    this._footer.invoke(response?.message || "Due updated successfully", "Dismiss");
                    this._location.back();
                } else {
                    this._footer.invoke(response?.message || "Due cannot be updated", "Dismiss");
                }
            });
        } else {
            this._dueService.insert<Payload>(payload).subscribe(response => { 
                if (response?.status_code === StatusCode.CREATED) {
                    this._footer.invoke(response?.message || "Due created successfully", "Dismiss");
                    this.formDirective.resetForm();
                    this.formGroup.reset({start_date: new Date()});
                } else {
                    this._footer.invoke(response?.message || "Due cannot be created", "Dismiss");
                }
            })
        }        
    }
}
