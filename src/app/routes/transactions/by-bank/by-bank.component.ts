import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../services/export.service';
import { StatusCode, TransactionNS } from '../../../types/export.types';
import { CommonModule } from '@angular/common';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';
import { DateFormatterPipe } from '../../../pipes/date-formatter.pipe';

@Component({
    selector: 'app-by-bank',
    standalone: true,
    imports: [CommonModule, AmountFormatterPipe, DateFormatterPipe],
    templateUrl: './by-bank.component.html',
    styleUrl: './by-bank.component.scss'
})
export class ByBankComponent {
    private _bankId: string = "";
    private _month: string | null = "";
    private _year: string | null = "";
    public bankTransactions: TransactionNS.ListByCategory.IData[] = [];
    public bankName: string = "";

    constructor (
        private readonly _activeRoute: ActivatedRoute,
        private readonly _service: TransactionService,
    ) { }

    ngOnInit(): void {
        this._bankId = this._activeRoute.snapshot.params?.['bankId'];
        this._month = this._activeRoute.snapshot.queryParamMap.get("month");
        this._year = this._activeRoute.snapshot.queryParamMap.get("year");
        this._fetchData();
    }

    private _fetchData(): void {
        this._service.listByBank(this._bankId, this._month, this._year).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this.bankTransactions = response?.result?.data || [];
                this.bankName = response?.result?.bank || "";
            }
        });
    }

    ngOnDestroy(): void { }
}
