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
import { DateFormatterPipe } from '../../../pipes/date-formatter.pipe';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'dashboard',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
    imports: [
        MatTableModule, 
        MatButtonModule, 
        CommonModule, 
        MarginDirective, 
        TextDirective, 
        AppDirective, 
        FormModule, 
        CategoryTrnsComponent, 
        DateFormatterPipe, 
        AmountFormatterPipe,
        MatIconModule,
        MatMenuModule
    ],
})
export class TransactionListComponent implements OnInit, OnDestroy {
    public columns: string[] = ['date', 'debit', 'credit', 'count'];
    public error: boolean = false;
    public message: string = "";
    public count: number = 0;
    public dataSource: TransactionNS.ListViewNS.IList[] = [];
    public categories: TransactionNS.ListViewNS.ICategory[] = [];
    public mapOfMonths: Map<number, string> = new Map();
    public month: number = new Date().getMonth() + 1;
    public selectedMonth: string = "";
    private _subscription: Subscription = new Subscription();    
    private _selectedYear: number = new Date().getFullYear();

    /**
     * @param TRANSACTION Service that allows to call `transactions` APIs as methods
     */
    constructor(private readonly _transaction: TransactionService, private readonly _router: Router, private readonly _active_route: ActivatedRoute) { }

    ngOnInit(): void {
        this.monthInit();
        this.fetchTransactions();
    }

    private monthInit(): void {
        this.mapOfMonths.set(1, 'Jan');        
        this.mapOfMonths.set(2, 'Feb');        
        this.mapOfMonths.set(3, 'Mar');        
        this.mapOfMonths.set(4, 'Apr');        
        this.mapOfMonths.set(5, 'May');        
        this.mapOfMonths.set(6, 'Jun');        
        this.mapOfMonths.set(7, 'Jul');        
        this.mapOfMonths.set(8, 'Aug');        
        this.mapOfMonths.set(9, 'Sep');        
        this.mapOfMonths.set(10, 'Oct');        
        this.mapOfMonths.set(11, 'Nov');        
        this.mapOfMonths.set(12, 'Dec');

        this.selectedMonth = this.mapOfMonths.get(this.month) || this.selectedMonth;
    }

    private fetchTransactions(): void {
        const queryParams = {
            month: ('0' + this.month).slice(-2),
            year: this._selectedYear
        };

        this._subscription = this._transaction.list<TransactionNS.ListViewNS.IResponse>(queryParams).subscribe({ 
            next: this.fetchTransactionsSuccess.bind(this), 
            error: this.fetchTransactionsError.bind(this) 
        });
    }

    private fetchTransactionsSuccess(response: IApiResonse<TransactionNS.ListViewNS.IResponse>): void {
        if (response?.status_code === StatusCode.OK) {
            this.dataSource = response?.result?.transactions || [];
            this.count = response?.result?.total_count || 0;
            this.categories = response?.result?.categories || [];
            return;
        }
    }

    private fetchTransactionsError(error: Error): void {
        // this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
    }

    public toDateView(date: string): void {
        this._router.navigate([date], {relativeTo: this._active_route});
    }

    public ngOnDestroy(): void {
        this._subscription?.unsubscribe();
    }

    public toAddView(): void {
        this._router.navigate(['add'], {relativeTo: this._active_route});
    }

    public previousMonth(): void {
        if (!this.month) this.month = 12;        
        this.month--;
        this.selectedMonth = this.mapOfMonths.get(this.month) || this.selectedMonth;
        this.fetchTransactions();
    }

    public nextMonth(): void {
        if (this.month === 12) this.month = 1;
        this.month++;
        this.selectedMonth = this.mapOfMonths.get(this.month) || this.selectedMonth;
        this.fetchTransactions();
    }

    public onMenuSelectItem(item: string): void {
        // console.log(item);
    }
}
