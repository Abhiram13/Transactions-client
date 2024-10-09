import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TransactionNS } from '../../../../types/export.types';
import { MarginDirective } from '../../../../directives/directives';
import { AmountFormatterPipe } from '../../../../pipes/amount-formatter.pipe';

type ListView = TransactionNS.ListViewNS.IBank; 

@Component({
    selector: 'bank-trns',
    standalone: true,
    imports: [MatTableModule, CommonModule, MarginDirective, AmountFormatterPipe],
    templateUrl: './bank-trns.component.html',
    styleUrl: './bank-trns.component.scss'
})
export class BankTrnsComponent {
    @Input() public dataSource: ListView[] = [];

    public columns: string[] = ['name', 'amount'];
}
