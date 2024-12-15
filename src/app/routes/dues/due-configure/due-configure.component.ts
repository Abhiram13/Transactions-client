import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormModule } from '../../../modules/form.module';
import { CommonModule } from '@angular/common';
import { MatFieldDirective } from '../../../directives/directives';
import { BankNS, StatusCode } from '../../../types/export.types';
import { BankService } from '../../../services/bank.service';
import { DueService } from '../../../services/due.service';
import { ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';

interface IPayload {
    description: string;
    to_bank: string;
    amount: number | string;
    status: number | string;
}

@Component({
    selector: 'app-due-configure',
    standalone: true,
    imports: [FormModule, CommonModule, MatFieldDirective],
    templateUrl: './due-configure.component.html',
    styleUrl: './due-configure.component.scss'
})
export class DueConfigureComponent implements OnInit {
    private _dueId: string = "";
    private _due: IPayload = {} as IPayload;
    private _type: 'add' | 'update' = 'add';
    public formGroup!: FormGroup;
    public banks: BankNS.IList[] = [];

    @ViewChild("formDirective")
    public formDirective!: FormGroupDirective;

    constructor(
        private readonly _builder: FormBuilder, 
        private readonly _bankService: BankService, 
        private readonly _dueService: DueService,
        private readonly _activeRoute: ActivatedRoute,
        private readonly _footer: FooterService
    ) {
        this.formGroup = this._builder.group({
            amount: [''],
            description: ['', [Validators.required]],
            status: ['', [Validators.required]],
            to_bank: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this._dueId = this._activeRoute.snapshot.params?.['dueId'];
        this._fetchBanks();

        if (this._dueId) {
            this._type = 'update';
            this._fetchDue();     
        }
    }

    protected _fetchDue(): void {
        this._dueService.searchById<IPayload>(this._dueId).subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this._due = response.result || {} as IPayload;
                this._setDueForm();
            }
        });
    }

    private _setDueForm(): void {
        this.formGroup.get("amount")?.setValue(this._due.amount);
        this.formGroup.get("description")?.setValue(this._due.description);
        this.formGroup.get("status")?.setValue(`${this._due.status}`);
        this.formGroup.get("to_bank")?.setValue(this._due.to_bank);
    }

    protected _fetchBanks(): void {
        this._bankService.list<BankNS.IList[]>().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.banks = response?.result || [];
            }
        });
    }

    public get amount(): FormControl {
        return this.formGroup.get("amount") as FormControl;
    }

    public get status(): FormControl {
        return this.formGroup.get("status") as FormControl;
    }

    public get description(): FormControl {
        return this.formGroup.get("description") as FormControl;
    }

    public get to_bank(): FormControl {
        return this.formGroup.get("to_bank") as FormControl;
    }

    public onSubmit(): void {
        const payload: IPayload = {
            amount: Number(this.formGroup.get('amount')?.value),
            description: this.formGroup.get('description')?.value,
            status: Number(this.formGroup.get('status')?.value),
            to_bank: this.formGroup.get('to_bank')?.value
        };

        if (this._type === 'update') {
            this._dueService.update<IPayload>(this._dueId, {
                ...payload,
                amount: `${payload.amount}`,
                status: `${payload.status}`
            }).subscribe(response => {
                if (response?.status_code === StatusCode.CREATED) {
                    this._footer.invoke(response?.message || "Due updated successfully", "Dismiss");
                } else {
                    this._footer.invoke(response?.message || "Due cannot be updated", "Dismiss");
                }
            });
        } else {
            this._dueService.insert<IPayload>(payload).subscribe(response => { 
                if (response?.status_code === StatusCode.CREATED) {
                    this._footer.invoke(response?.message || "Due created successfully", "Dismiss");
                } else {
                    this._footer.invoke(response?.message || "Due cannot be created", "Dismiss");
                }
            })
        }        
    }
}
