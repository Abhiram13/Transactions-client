import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { AmountFormatterPipe } from '../../../../pipes/amount-formatter.pipe';
import { MatSort, MatSortModule } from "@angular/material/sort";
import IBank = TransactionNS.ListViewNS.IBank;
import { ActivatedRoute, Router } from '@angular/router';

type ListView = TransactionNS.ListViewNS.IBank;
type DateParams = {month: string, year: string};

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

    constructor(private _router: Router, private readonly _activeRoute: ActivatedRoute) { }

    ngAfterViewInit(): void {
        this.dataSource.sort = this._sort;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['banks']?.currentValue) {
            this.dataSource.data = this.banks;
        }
    }

    private _getQueryParams(): DateParams {
        const params: string[] = window.location.search.split("?")?.[1].split("&");
        const obj: DateParams = {
            month: new Date().getMonth().toString().padStart(2, '0'),
            year: new Date().getFullYear().toString(),
        };
        params?.map(param => {
            const [key, value] = param?.split("=");
            if (key === 'month' || key === 'year') {
                obj[key] = value.padStart(2, '0');
            }
        });

        return obj;
    }

    public toBankView(bankId: string): void {
        const params: DateParams = this._getQueryParams();
        this._router.navigate([`bank/${bankId}`], { relativeTo: this._activeRoute, queryParams: {...params} });
    }
}
