import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AmountFormatterPipe } from "../../../../pipes/amount-formatter.pipe";
import { DateFormatterPipe } from "../../../../pipes/date-formatter.pipe";
import { MatTableModule } from "@angular/material/table";
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { Router, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'transactions-list',
    standalone: true,
    imports: [
        AmountFormatterPipe,
        DateFormatterPipe,
        MarginDirective,
        MatTableModule,
        MatButtonModule,
        CommonModule,
        AmountFormatterPipe
    ],
    templateUrl: './transactions-list.component.html',
    styleUrl: './transactions-list.component.scss'
})
export class TransactionsTableComponent  {
    @Input() public dataSource: TransactionNS.ListViewNS.IList[] = [];

    public columns: string[] = ['date', 'debit', 'credit', 'count'];

    constructor (
        private readonly _router: Router,
        private readonly _activeRoute: ActivatedRoute
    ) {}

    public toDateView(date: string): void {
        this._router.navigate([`date/${date}`], { relativeTo: this._activeRoute });
    }
}
