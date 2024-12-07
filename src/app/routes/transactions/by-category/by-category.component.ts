import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../services/export.service';
import { StatusCode, TransactionNS } from '../../../types/export.types';
import { CommonModule } from '@angular/common';
import { AmountFormatterPipe } from '../../../pipes/amount-formatter.pipe';
import { DateFormatterPipe } from '../../../pipes/date-formatter.pipe';

@Component({
    selector: 'app-by-category',
    standalone: true,
    imports: [CommonModule, AmountFormatterPipe, DateFormatterPipe],
    templateUrl: './by-category.component.html',
    styleUrl: './by-category.component.scss'
})
export class ByCategoryComponent implements OnInit, OnDestroy {
    private _categoryId: string = "";
    private _month: string | null = "";
    private _year: string | null = "";
    public categoryTransactions: TransactionNS.ListByCategory.IData[] = [];
    public categoryName: string = "";

    constructor (
        private readonly _activeRoute: ActivatedRoute,
        private readonly _service: TransactionService,
    ) { }

    ngOnInit(): void {
        this._categoryId = this._activeRoute.snapshot.params?.['categoryId'];
        this._month = this._activeRoute.snapshot.queryParamMap.get("month");
        this._year = this._activeRoute.snapshot.queryParamMap.get("year");
        this._fetchData();
    }

    private _fetchData(): void {
        this._service.listByCategory(this._categoryId, this._month, this._year).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this.categoryTransactions = response?.result?.data || [];
                this.categoryName = response?.result?.category || "";
            }
        });
    }

    ngOnDestroy(): void { }
}
