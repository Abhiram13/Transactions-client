import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CategoryService } from '../../../services/category.service';
import { BankService } from '../../../services/bank.service';
import { ICategoryList, IBankList, StatusCode } from "../../../types/export.types";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

enum TransactionType {
    Debit = 1,
    Credit = 2,
    PartialDebit = 3,
    PartialCredit = 4
}

interface ITransactionInsertPayload {
    amount: number;
    type: TransactionType;
    description: string;
    date: string;
    due: boolean;
    from_bank: string;
    to_bank: string;
    category_id: string;
}

@Component({
    selector: 'app-configure',
    standalone: true,
    providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
    imports: [MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatDatepickerModule, MatSlideToggleModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss'
})
export class ConfigureComponent implements OnInit {
    formGroup!: FormGroup;
    banks: IBankList[] = [];
    categories: ICategoryList[] = [];
    todayDate: Date = new Date();

    constructor (private readonly BUILDER: FormBuilder, private readonly CATGEORY: CategoryService, private readonly BANK: BankService) {
        this.formGroup = this.BUILDER.group({
            amount: ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
            type: ['', [Validators.required]],
            description: ['', [Validators.required]],
            date: [new Date(), [Validators.required]],
            due: [false],
            from_bank: [''],
            to_bank: [''],
            category_id: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.BANK.list().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.banks = response?.result || [];
            }
        });

        this.CATGEORY.list().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.categories = response?.result || [];
            }
        });
    }

    get amount(): FormControl {
        return this.formGroup.get("amount") as FormControl;
    }

    get type(): FormControl {
        return this.formGroup.get("type") as FormControl;
    }

    get description(): FormControl {
        return this.formGroup.get("description") as FormControl;
    }

    get date(): FormControl {
        return this.formGroup.get("date") as FormControl;
    }

    get due(): FormControl {
        return this.formGroup.get("due") as FormControl;
    }

    get from_bank(): FormControl {
        return this.formGroup.get("from_bank") as FormControl;
    }

    get to_bank(): FormControl {
        return this.formGroup.get("to_bank") as FormControl;
    }

    get category_id(): FormControl {
        return this.formGroup.get("category_id") as FormControl;
    }

    onSubmit(): void {
        const AMOUNT = this.formGroup.get('amount')?.value;
        const TYPE = this.formGroup.get('type')?.value;
        const DESCRIPTION = this.formGroup.get('description')?.value;
        const DATE = this.formGroup.get('date')?.value;
        const FROMBANK = this.formGroup.get('from_bank')?.value;
        const TOBANK = this.formGroup.get('to_bank')?.value;
        const CATEGORYID = this.formGroup.get('category_id')?.value;
        const DUE = this.formGroup.get('due')?.value;
        const TRANSACTION = new Transaction(AMOUNT, CATEGORYID, DATE, DESCRIPTION, DUE, FROMBANK, TOBANK, TYPE);

        console.log({TRANSACTION});
    }
}

class Transaction implements ITransactionInsertPayload {
    amount: number;
    category_id: string;
    date: string;
    description: string;
    due: boolean;
    from_bank: string;
    to_bank: string;
    type: number;

    constructor(amount: number, category: string, date: string, description: string, due: boolean, fromBank: string, toBank: string, type: TransactionType) {
        this.amount = Number(amount);
        this.category_id = category;
        this.description = description;
        this.due = due;
        this.from_bank = fromBank;
        this.to_bank = toBank;
        this.type = Number(type);
        this.date = this.modifyDate(date);
    }

    private modifyDate(date: string): string {
        const [DD, MM, YYYY] = new Date(date)?.toLocaleDateString()?.split("/");
        return `${YYYY}-${MM}-${DD}`;
    }
}
