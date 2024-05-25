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
import { CategoryNS, BankNS, StatusCode, TransactionNS } from "../../../types/export.types";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterService } from '../../../services/footer.service';
import { TransactionService } from '../../../services/transactions.service';

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
    banks: BankNS.IList[] = [];
    categories: CategoryNS.IList[] = [];
    todayDate: Date = new Date();

    constructor (private readonly BUILDER: FormBuilder, private readonly SERVICE: TransactionService, private readonly CATGEORY: CategoryService, private readonly BANK: BankService, private readonly FOOTER: FooterService) {
        this.formGroup = this.BUILDER.group({
            amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]],
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

    private isFormInValid(): boolean {
        const CONTROL = this.formGroup?.controls;

        return Boolean(CONTROL?.['amount']?.errors) ||
            Boolean(CONTROL?.['type']?.errors) ||
            Boolean(CONTROL?.['description']?.errors) ||
            Boolean(CONTROL?.['date']?.errors) ||        
            Boolean(CONTROL?.['from_bank']?.errors) ||
            Boolean(CONTROL?.['to_bank']?.errors) ||
            Boolean(CONTROL?.['category_id']?.errors);
    }

    onSubmit(): void {
        try {
            const AMOUNT = this.formGroup.get('amount')?.value;
            const TYPE = this.formGroup.get('type')?.value;
            const DESCRIPTION = this.formGroup.get('description')?.value;
            const DATE = this.formGroup.get('date')?.value;
            const FROMBANK = this.formGroup.get('from_bank')?.value;
            const TOBANK = this.formGroup.get('to_bank')?.value;
            const CATEGORYID = this.formGroup.get('category_id')?.value;
            const DUE = this.formGroup.get('due')?.value;
            const TRANSACTION = new Transaction(AMOUNT, CATEGORYID, DATE, DESCRIPTION, DUE, FROMBANK, TOBANK, TYPE);

            if (this.isFormInValid()) {
                this.FOOTER.invoke("Provide valid details", "Dismiss");
                return;
            }

            this.SERVICE.insert(TRANSACTION).subscribe(response => {
                if (response?.status_code === StatusCode.CREATED) {
                    this.FOOTER.invoke("Transaction inserted successfully", "Dismiss");
                } else {
                    this.FOOTER.invoke(response?.message || "Something went wrong", "Dismiss");
                }
            }, error => {
                this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
            });
        } catch (e: any) {
            this.FOOTER.invoke(e?.message || "Something went wrong", "Dismiss");
        }        
    }
}

class Transaction implements TransactionNS.ITransactionInsertPayload {
    amount: number;
    category_id: string;
    date: string;
    description: string;
    due: boolean;
    from_bank: string;
    to_bank: string;
    type: number;

    constructor(amount: string, category: string, date: string, description: string, due: boolean, fromBank: string, toBank: string, type: TransactionNS.TransactionType) {
        this.amount = parseFloat(amount);
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
        return `${YYYY}-${MM.padStart(2, '0')}-${DD}`;
    }
}
