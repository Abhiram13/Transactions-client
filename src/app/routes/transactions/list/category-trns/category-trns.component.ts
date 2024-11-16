import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { AmountFormatterPipe } from '../../../../pipes/amount-formatter.pipe';

type ListViewCategory = TransactionNS.ListViewNS.ICategory; 

@Component({
    selector: 'category-trns',
    standalone: true,
    imports: [MatTableModule, CommonModule, MarginDirective, AmountFormatterPipe],
    templateUrl: './category-trns.component.html',
    styleUrl: './category-trns.component.scss'
})
export class CategoryTrnsComponent {
    @Input() public dataSource: ListViewCategory[] = [];
    public columns: string[] = ['category', 'amount'];
}
