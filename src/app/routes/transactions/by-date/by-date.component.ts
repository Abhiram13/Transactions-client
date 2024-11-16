import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../services/transactions.service';
import { TransactionNS } from '../../../types/dashboard.types';
import { StatusCode } from '../../../types/enums.types';
import { CommonModule } from '@angular/common';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';
import { DateFormatterPipe } from "../../../pipes/date-formatter.pipe";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuModule } from "@angular/material/menu";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from "../../../components/delete-dialog/delete-dialog.component";
import { FooterService } from "../../../services/footer.service";

@Component({
    selector: 'app-by-date',
    standalone: true,
    imports: [CommonModule, AmountFormatterPipe, DateFormatterPipe, MatIcon, MatIconButton, MatMenu, MatMenuItem, MatMenuModule, MatIconModule],
    templateUrl: './by-date.component.html',
    styleUrl: './by-date.component.scss'
})
export class ByDateComponent implements OnInit {
    private _borderColorMap: Map<TransactionNS.TransactionType, string> = new Map();
    public list: TransactionNS.IDataByDate = {} as TransactionNS.IDataByDate;
    public date: string = "";

    constructor (
        private readonly _service: TransactionService,
        private readonly _activeRoute: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _footer: FooterService,
        private readonly _router: Router
    ) { }

    ngOnInit(): void {
        this.date = this._activeRoute.snapshot.params?.['date'];
        this._borderColorMap.set(TransactionNS.TransactionType.Debit, 'debit');
        this._borderColorMap.set(TransactionNS.TransactionType.Credit, 'credit');
        this._borderColorMap.set(TransactionNS.TransactionType.PartialCredit, 'partial-credit');
        this._borderColorMap.set(TransactionNS.TransactionType.PartialDebit, 'partial-debit');
        this._fetchData();
    }

    public fetchColor(status: TransactionNS.TransactionType): string {
        return this._borderColorMap.get(status) || '#6e6e6e';
    }

    private _fetchData(): void {
        this._service.listByDate(this.date).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this.list = response?.result || {} as TransactionNS.IDataByDate;
            }
        });
    }

    public onDelete(transactionId: string): void {
        const REF: MatDialogRef<DeleteDialogComponent> = this._dialog.open(DeleteDialogComponent, {});
        REF.afterClosed().subscribe((result: 'Yes' | 'No') => {
            if (result === 'Yes') {
                this._service.delete(transactionId).subscribe(res => {
                    this._footer.invoke(res?.message as string, 'Dismiss');
                    if (res?.status_code === StatusCode.OK) {
                        this._fetchData();
                    }
                });
            }
        });
    }

    public onEdit(transactionId: string): void {
        this._router.navigateByUrl(`transactions/edit/${transactionId}`);
    }
}
