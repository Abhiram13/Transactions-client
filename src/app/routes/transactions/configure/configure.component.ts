import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CategoryService } from '../../../services/category.service';
import { BankService } from '../../../services/bank.service';
import { CategoryNS, BankNS, StatusCode, TransactionNS, DueNS } from "../../../types/export.types";
import { FooterService } from '../../../services/footer.service';
import { TransactionService } from '../../../services/transactions.service';
import { DueConfigureComponent } from './due-configure/due-configure.component';
import { MatFieldDirective } from '../../../directives/directives';
import { FormModule } from '../../../modules/form.module';
import { ActivatedRoute } from '@angular/router';
import ITransactionInsertPayload = TransactionNS.ITransactionInsertPayload;

@Component({standalone: true, template: ""})
class TransactionConfigureComponent implements OnInit {
    public formGroup!: FormGroup;
    public banks: BankNS.IList[] = [];
    public categories: CategoryNS.IList[] = [];
    public todayDate: Date = new Date();
    public isSubmitTriggered: boolean = false;

    @ViewChild("formDirective")
    public formDirective!: FormGroupDirective;

    constructor(
        protected readonly _builder: FormBuilder,
        protected readonly _service: TransactionService,
        protected readonly _category: CategoryService,
        protected readonly _bank: BankService,
        protected readonly _footer: FooterService,
        protected readonly _activeRoute: ActivatedRoute,
        protected readonly _location: Location,
    ) {
        this.formGroup = this._builder.group({
            amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,4})?$/)]],
            type: ['', [Validators.required]],
            description: ['', [Validators.required]],
            date: [new Date(), [Validators.required]],
            due: [false],
            from_bank: [''],
            to_bank: [''],
            category_id: ['', [Validators.required]],
        });
    }

    ngOnInit(): void { }

    protected _fetchBanks(): void {
        this._bank.list<BankNS.IList[]>().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.banks = response?.result || [];
            }
        });
    }

    protected _fetchCategories(): void {
        this._category.list<CategoryNS.IList[]>().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.categories = response?.result || [];
            }
        });
    }

    public get amount(): FormControl {
        return this.formGroup.get("amount") as FormControl;
    }

    public get type(): FormControl {
        return this.formGroup.get("type") as FormControl;
    }

    public get description(): FormControl {
        return this.formGroup.get("description") as FormControl;
    }

    public get date(): FormControl {
        return this.formGroup.get("date") as FormControl;
    }

    public get due(): FormControl {
        return this.formGroup.get("due") as FormControl;
    }

    public get from_bank(): FormControl {
        return this.formGroup.get("from_bank") as FormControl;
    }

    public get to_bank(): FormControl {
        return this.formGroup.get("to_bank") as FormControl;
    }

    public get category_id(): FormControl {
        return this.formGroup.get("category_id") as FormControl;
    }

    protected _isFormInValid(): boolean {
        const CONTROL = this.formGroup?.controls;

        return Boolean(CONTROL?.['amount']?.errors) ||
            Boolean(CONTROL?.['type']?.errors) ||
            Boolean(CONTROL?.['description']?.errors) ||
            Boolean(CONTROL?.['date']?.errors) ||
            Boolean(CONTROL?.['from_bank']?.errors) ||
            Boolean(CONTROL?.['to_bank']?.errors) ||
            Boolean(CONTROL?.['category_id']?.errors);
    }

    protected _modifyDate(date: string): string {
        const [DD, MM, YYYY] = new Date(date)?.toLocaleDateString()?.split("/");
        return `${YYYY}-${MM.padStart(2, '0')}-${DD.padStart(2, '0')}`;
    }
}

@Component({
    selector: 'app-configure',
    standalone: true,
    providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, TransactionService],
    imports: [FormModule, CommonModule, DueConfigureComponent, MatFieldDirective],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss',
})
export class AddConfigureComponent extends TransactionConfigureComponent implements OnInit {
    public title: string = "Add";

    override ngOnInit() {
        super.ngOnInit();
        this._fetchBanks();
        this._fetchCategories();
    }

    public submitDue(payload: DueNS.IPayload): void { }

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

            if (this._isFormInValid()) {
                this._footer.invoke("Provide valid details", "Dismiss");
                return;
            }

            this._service.insert(TRANSACTION).subscribe(response => {
                if (response?.status_code === StatusCode.CREATED) {
                    this._footer.invoke("Transaction inserted successfully", "Dismiss");
                    this.formDirective.resetForm();
                    this.formGroup.reset({date: new Date()});
                }
            });
        } catch (e: any) {
            this._footer.invoke(e?.message || "Something went wrong", "Dismiss");
        }
    }
}

@Component({
    selector: 'app-configure',
    standalone: true,
    providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, TransactionService],
    imports: [FormModule, CommonModule, DueConfigureComponent, MatFieldDirective],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss',
})
export class EditConfigureComponent extends TransactionConfigureComponent implements OnInit {
    private _transactionId: string = "";
    public title: string = "Update";

    override ngOnInit() {
        super.ngOnInit();
        this._fetchBanks();
        this._fetchCategories();
        this._transactionId = this._activeRoute.snapshot.params?.['id'];
        this._fetchTransaction();
    }

    private _fetchTransaction(): void {
        this._service.searchById<ITransactionInsertPayload>(this._transactionId).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this._setTransactionForm(response?.result as ITransactionInsertPayload);
            }
        });
    }

    private _setTransactionForm(transaction: ITransactionInsertPayload): void {
        this.formGroup.get("amount")?.setValue(transaction.amount);
        this.formGroup.get("type")?.setValue(`${transaction.type}`);
        this.formGroup.get("description")?.setValue(transaction.description);
        this.formGroup.get("date")?.setValue(transaction.date);
        this.formGroup.get("due")?.setValue(transaction.due);
        this.formGroup.get("from_bank")?.setValue(transaction.from_bank);
        this.formGroup.get("to_bank")?.setValue(transaction.to_bank);
        this.formGroup.get("category_id")?.setValue(transaction.category_id);
    }

    public onSubmit(): void {
        const AMOUNT = this.formGroup.get('amount')?.value;
        const TYPE = this.formGroup.get('type')?.value;
        const DESCRIPTION = this.formGroup.get('description')?.value;
        const DATE = this._modifyDate(this.formGroup.get('date')?.value);
        const FROM_BANK = this.formGroup.get('from_bank')?.value;
        const TO_BANK = this.formGroup.get('to_bank')?.value;
        const CATEGORY_ID = this.formGroup.get('category_id')?.value;
        const DUE = this.formGroup.get('due')?.value;

        if (this._isFormInValid()) {
            this._footer.invoke("Provide valid details", "Dismiss");
            return;
        }

        const PAYLOAD = {
            amount: `${AMOUNT}`,
            category_id: CATEGORY_ID,
            date: DATE,
            description: DESCRIPTION,
            due: `${DUE}`,
            from_bank: FROM_BANK,
            to_bank: TO_BANK,
            type: TYPE
        };

        this._service.update(this._transactionId, PAYLOAD).subscribe(response => {
            if (response?.status_code === StatusCode.CREATED) {
                this._footer.invoke(response?.message || "Transaction updated successfully", "Dismiss");
                this._location.back();
            } else {
                this._footer.invoke(response?.message || "Transaction cannot be updated", "Dismiss");
            }
        });
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
        this.category_id = category || "";
        this.description = description || "";
        this.due = !!due;
        this.from_bank = fromBank || "";
        this.to_bank = toBank || "";
        this.type = Number(type) || TransactionNS.TransactionType.Debit;
        this.date = this.modifyDate(date);
    }

    private modifyDate(date: string): string {
        const [DD, MM, YYYY] = new Date(date)?.toLocaleDateString()?.split("/");
        return `${YYYY}-${MM.padStart(2, '0')}-${DD.padStart(2, '0')}`;
    }
}
