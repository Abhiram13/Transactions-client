import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../services/transactions.service';
import { TransactionNS } from '../../../types/dashboard.types';
import { StatusCode } from '../../../types/enums.types';
import { CommonModule } from '@angular/common';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';

@Component({
    selector: 'app-by-date',
    standalone: true,
    imports: [CommonModule, AmountFormatterPipe],
    templateUrl: './by-date.component.html',
    styleUrl: './by-date.component.scss'
})
export class ByDateComponent implements OnInit {
    private date: string = "";
    list: TransactionNS.IDataByDate = {} as TransactionNS.IDataByDate;
    borderColorMap: Map<TransactionNS.TransactionType, string> = new Map();

    constructor (private readonly SERVICE: TransactionService, private readonly ACTIVEROUTE: ActivatedRoute) {}

    ngOnInit(): void {
        this.date = this.ACTIVEROUTE.snapshot.params?.['date'];
        this.borderColorMap.set(TransactionNS.TransactionType.Debit, 'debit');
        this.borderColorMap.set(TransactionNS.TransactionType.Credit, 'credit');
        this.borderColorMap.set(TransactionNS.TransactionType.PartialCredit, 'partial-credit');
        this.borderColorMap.set(TransactionNS.TransactionType.PartialDebit, 'partial-debit');
        this.fetchData();
    }

    fetchColor(status: TransactionNS.TransactionType): string {
        return this.borderColorMap.get(status) || '#6e6e6e';
    }

    private fetchData() {
        this.SERVICE.listByDate(this.date).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this.list = response?.result || {} as TransactionNS.IDataByDate;
            }
        });
    }
}
