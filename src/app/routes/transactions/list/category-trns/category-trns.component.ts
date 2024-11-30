import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { AmountFormatterPipe } from '../../../../pipes/amount-formatter.pipe';
import { MatSort, MatSortModule } from "@angular/material/sort";
import ICategory = TransactionNS.ListViewNS.ICategory;

type ListViewCategory = TransactionNS.ListViewNS.ICategory;

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

    ngAfterViewInit(): void {
        this.dataSource.sort = this._sort;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.['categories']?.currentValue) {
            this.dataSource.data = this.categories;
        }
    }
}
