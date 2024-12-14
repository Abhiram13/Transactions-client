import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormModule } from '../../../modules/form.module';
import { CommonModule } from '@angular/common';
import { MatFieldDirective } from '../../../directives/directives';
import { BankNS, StatusCode } from '../../../types/export.types';
import { BankService } from '../../../services/bank.service';
import { DueService } from '../../../services/due.service';

interface IPayload {
    description: string;
    to_bank: string;
    amount: number;
    status: number;
}

@Component({
    selector: 'app-due-configure',
    standalone: true,
    imports: [FormModule, CommonModule, MatFieldDirective],
    templateUrl: './due-configure.component.html',
    styleUrl: './due-configure.component.scss'
})
export class DueConfigureComponent implements OnInit {
    public formGroup!: FormGroup;
    public banks: BankNS.IList[] = [];

    @ViewChild("formDirective")
    public formDirective!: FormGroupDirective;

    constructor(private readonly _builder: FormBuilder, private readonly _bankService: BankService, private readonly _dueService: DueService) {
        this.formGroup = this._builder.group({
            amount: [''],
            description: ['', [Validators.required]],
            status: ['', [Validators.required]],
            to_bank: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this._fetchBanks();
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

        this._dueService.insert<IPayload>(payload).subscribe(response => {            
        })
    }
}
