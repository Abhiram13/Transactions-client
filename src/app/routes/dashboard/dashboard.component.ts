import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table';
import { TransactionService } from '../../services/export.service';
import { IApiResonse, StatusCode, IListByDate } from "../../types/export.types";
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [MatTableModule, MatButtonModule, CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
    columns: string[] = ['date', 'debit', 'credit'];
    error: boolean = false;
    message: string = "";
    private subscription: Subscription = new Subscription();
    dataSource: IListByDate[] = [
        {date: "2024-08-03", credit: 12.5, debit: 10, count: 10},
        {date: "2024-08-04", credit: 1.5, debit: 20, count: 20}
    ];

    constructor(private readonly transactionService: TransactionService) {}

    ngOnInit(): void {
        this.fetchTransactions();
    }

    private fetchTransactions(): void {
        this.subscription = this.transactionService.listByDate().subscribe(this.fetchTransactionsSuccess, this.fetchTransactionsError);
    }

    private fetchTransactionsSuccess(response: IApiResonse<IListByDate[]>) {
        if (response.status_code === StatusCode.OK) {
            this.dataSource = response.result || [];
            return;
        }
    }

    private fetchTransactionsError(error: Error) {
        this.message = JSON.stringify(error?.message);
        this.error = true;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
