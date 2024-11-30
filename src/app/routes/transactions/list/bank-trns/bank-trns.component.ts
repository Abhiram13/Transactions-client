import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { AmountFormatterPipe } from '../../../../pipes/amount-formatter.pipe';
import { MatSort, MatSortModule } from "@angular/material/sort";
import IBank = TransactionNS.ListViewNS.IBank;

type ListView = TransactionNS.ListViewNS.IBank;

@Component({
    selector: 'bank-trns',
    standalone: true,
    imports: [MatTableModule, CommonModule, MarginDirective, AmountFormatterPipe, MatSort, MatSortModule],
    templateUrl: './bank-trns.component.html',
    styleUrl: './bank-trns.component.scss'
})
export class BankTrnsComponent implements OnChanges, AfterViewInit {
    @Input() public banks: ListView[] = [];
    @ViewChild(MatSort) private _sort!: MatSort;

    public columns: string[] = ['name', 'amount'];
    public dataSource: MatTableDataSource<IBank> = new MatTableDataSource();

    ngAfterViewInit(): void {
        this.dataSource.sort = this._sort;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['banks']?.currentValue) {
            this.dataSource.data = this.banks;
        }
    }
}
