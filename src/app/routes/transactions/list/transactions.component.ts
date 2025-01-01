import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/export.service';
import { IApiResonse, StatusCode, TransactionNS } from "../../../types/export.types";
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppDirective, MarginDirective, TextDirective } from '../../../directives/directives';
import { FormModule } from '../../../modules/form.module';
import { CategoryTrnsComponent } from './category-trns/category-trns.component';
import { TransactionsTableComponent } from './transactions-list/transactions-list.component';
import { DateFormatterPipe } from '../../../pipes/date-formatter.pipe';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BankTrnsComponent } from './bank-trns/bank-trns.component';

type DisplayType = "transaction" | "category" | "bank";

@Component({
    selector: 'dashboard',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    imports: [
        CommonModule,
        MarginDirective,
        TextDirective,
        AppDirective,
        FormModule,
        CategoryTrnsComponent,
        TransactionsTableComponent,
        BankTrnsComponent,
        DateFormatterPipe,
        AmountFormatterPipe,
        MatIconModule,
        MatMenuModule
    ],
})
export class TransactionListComponent implements OnInit, OnDestroy {
    public error: boolean = false;
    public message: string = "";
    public count: number = 0;
    public dataSource: TransactionNS.ListViewNS.IList[] = [];
    public categories: TransactionNS.ListViewNS.ICategory[] = [];
    public banks: TransactionNS.ListViewNS.IBank[] = [];
    public selectedMonth: string = "";
    public displayType: DisplayType = "transaction";
    private _monthsMap: Map<number, string> = new Map();
    private _month: number = new Date().getMonth() + 1;
    private _subscription: Subscription = new Subscription();
    private _year: number = new Date().getFullYear();

    /**
     * @param _transaction Service that allows to call `transactions` APIs as methods
     * @param _router
     * @param _activeRoute Current active route instance
     */
    constructor(private readonly _transaction: TransactionService, private readonly _router: Router, private readonly _activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.displayType = this._activeRoute.snapshot.queryParams?.['type'] || 'transaction';
        this._month = Number(this._activeRoute.snapshot.queryParams?.['month']) || Number(this._month) || new Date().getMonth() + 1;
        this._year = Number(this._activeRoute.snapshot.queryParams?.['year']) || new Date().getFullYear();
        this._monthInit();
        this._fetchTransactions();
    }

    private _monthInit(): void {
        this._monthsMap.set(1, 'Jan');
        this._monthsMap.set(2, 'Feb');
        this._monthsMap.set(3, 'Mar');
        this._monthsMap.set(4, 'Apr');
        this._monthsMap.set(5, 'May');
        this._monthsMap.set(6, 'Jun');
        this._monthsMap.set(7, 'Jul');
        this._monthsMap.set(8, 'Aug');
        this._monthsMap.set(9, 'Sep');
        this._monthsMap.set(10, 'Oct');
        this._monthsMap.set(11, 'Nov');
        this._monthsMap.set(12, 'Dec');

        this.selectedMonth = this._monthsMap.get(this._month) || this.selectedMonth;
    }

    private _fetchTransactions(): void {
        const queryParams = {
            month: ('0' + this._month).slice(-2),
            year: this._year,
            type: this.displayType,
        };

        this._subscription = this._transaction.list<TransactionNS.ListViewNS.IResponse>(queryParams).subscribe({
            next: this._fetchTransactionsSuccess.bind(this),
            error: this._fetchTransactionsError.bind(this)
        });
    }

    private _fetchTransactionsSuccess(response: IApiResonse<TransactionNS.ListViewNS.IResponse>): void {
        if (response?.status_code === StatusCode.OK) {
            this.dataSource = response?.result?.transactions || [];
            this.count = response?.result?.total_count || 0;
            this.categories = response?.result?.categories || [];
            this.banks = response?.result?.banks || [];
            return;
        }
    }

    private _fetchTransactionsError(error: Error): void {
        // this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
    }

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }

    public toAddView(): void {
        this._router.navigate(['add'], {relativeTo: this._activeRoute});
    }

    public previousMonth(): void {
        --this._month;
        
        if (!this._month) {
            this._month = 12;
            --this._year;
        }
        
        this.selectedMonth = this._monthsMap.get(this._month) || this.selectedMonth;
        this._setQueryParam({month: this._month, year: this._year});
        this._fetchTransactions();
    }

    public nextMonth(): void {
        ++this._month;
        
        if (this._month > 12) {
            this._month = 1;
            ++this._year;
        }

        this.selectedMonth = this._monthsMap.get(this._month) || this.selectedMonth;
        this._setQueryParam({month: this._month, year: this._year});
        this._fetchTransactions();
    }

    /**
     * Sets month and year query params in the current route URL
     * @param {object} params - the key value pair values to set in current URL query params
     */
    private _setQueryParam(params: object): void {
        this._router.navigate(['.'], { relativeTo: this._activeRoute, queryParams: { 
            ...this._activeRoute.snapshot.queryParams,
            ...params
        }});
    }

    public onMenuSelectItem(item: DisplayType): void {
        this.displayType = item;
        this._setQueryParam({type: item});
        this._fetchTransactions();
    }
}
