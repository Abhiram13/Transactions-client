import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../../services/export.service';
import { IApiResonse, StatusCode, TransactionNS } from "../../../types/export.types";
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';
import { AppDirective, MarginDirective, TextDirective } from '../../../directives/directives';
import { FormModule } from '../../../modules/form.module';
import { CategoryTrnsComponent } from './category-trns/category-trns.component';
import { DateFormatterPipe } from '../../../pipes/date-formatter.pipe';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [MatTableModule, MatButtonModule, CommonModule, MarginDirective, TextDirective, AppDirective, FormModule, CategoryTrnsComponent, DateFormatterPipe, AmountFormatterPipe],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
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
    private subscription: Subscription = new Subscription();    
    private selectedYear: number = new Date().getFullYear();   

    @ViewChild('footer', { read: ViewContainerRef })
    public footer!: ViewContainerRef;

    /**
     * @param TRANSACTION Service that allows to call `transactions` APIs as methods
     */
    constructor(private readonly TRANSACTION: TransactionService, private readonly ROUTER: Router, private readonly ACTIVEROUTE: ActivatedRoute, private readonly FOOTER: FooterService) { }

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
            year: this.selectedYear
        };

        this.subscription = this.TRANSACTION.list<TransactionNS.ListViewNS.IResponse>(queryParams).subscribe({ 
            next: this.fetchTransactionsSuccess.bind(this), 
            error: this.fetchTransactionsError.bind(this) 
        });
    }

    private fetchTransactionsSuccess(response: IApiResonse<TransactionNS.ListViewNS.IResponse>): void {
        if (response.status_code === StatusCode.OK) {
            this.dataSource = response?.result?.transactions || [];
            this.count = response?.result?.total_count || 0;
            this.categories = response?.result?.categories || [];
            return;
        } else {
            this.FOOTER.invoke(response?.message || "Something went wrong", "Dismiss");
        }
    }

    private fetchTransactionsError(error: Error): void {
        this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
    }

    public toDateView(date: string): void {
        this.ROUTER.navigate([date], {relativeTo: this.ACTIVEROUTE});
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public toAddView(): void {
        this.ROUTER.navigate(['add'], {relativeTo: this.ACTIVEROUTE});
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
}
