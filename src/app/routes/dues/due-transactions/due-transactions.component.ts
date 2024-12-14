import { Component, OnInit } from '@angular/core';
import { DueService } from '../../../services/due.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionNS } from '../../../types/export.types';
import { CommonModule } from '@angular/common';

interface IResult {
    description: string;
    amount: number;
    status: number;
    transactions: TransactionNS.ITransactionInsertPayload[];
}

@Component({
    selector: 'app-due-transactions',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './due-transactions.component.html',
    styleUrl: './due-transactions.component.scss'
})
export class DueTransactionsComponent implements OnInit {
    private _dueId: string = "";
    public result: IResult = {} as IResult;

    constructor (private readonly _service: DueService, private readonly _activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._dueId = this._activeRoute.snapshot.params?.['dueId'];
        this._fetchDueTransactions();
    }

    private _fetchDueTransactions(): void {
        this._service.dueTransactions(this._dueId).subscribe(response => {
            this.result = response.result as IResult;
        });
    }    
}
