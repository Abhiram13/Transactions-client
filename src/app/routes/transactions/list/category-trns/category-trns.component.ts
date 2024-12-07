import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { AmountFormatterPipe } from '../../../../pipes/amount-formatter.pipe';
import { MatSort, MatSortModule } from "@angular/material/sort";
import ICategory = TransactionNS.ListViewNS.ICategory;
import { Router, ActivatedRoute } from '@angular/router';

type ListViewCategory = TransactionNS.ListViewNS.ICategory;
type DateParams = {month: string, year: string};

@Component({
    selector: 'category-trns',
    standalone: true,
    imports: [MatTableModule, CommonModule, MarginDirective, AmountFormatterPipe, MatSort, MatSortModule],
    templateUrl: './category-trns.component.html',
    styleUrl: './category-trns.component.scss'
})
export class CategoryTrnsComponent implements OnChanges, AfterViewInit {
    @Input() public categories: ListViewCategory[] = [];
    @ViewChild(MatSort) private _sort!: MatSort;

    public columns: string[] = ['category', 'amount'];
    public dataSource: MatTableDataSource<ICategory> = new MatTableDataSource();

    constructor(private readonly _router: Router, private readonly _activeRoute: ActivatedRoute) { }

    ngAfterViewInit(): void {
        this.dataSource.sort = this._sort;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['categories']?.currentValue) {
            this.dataSource.data = this.categories;
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

    public toCategoryView(categoryId: string): void {
        const params: DateParams = this._getQueryParams();
        this._router.navigate([`category/${categoryId}`], { relativeTo: this._activeRoute, queryParams: {...params} });
    }
}
