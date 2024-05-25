import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BankService } from '../../../services/bank.service';
import { IBankList, StatusCode } from "../../../types/export.types";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bank-list',
    standalone: true,
    imports: [MatDividerModule, MatListModule, CommonModule, MatButtonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class BankListComponent {
    banks: IBankList[] = [];

    constructor(private readonly BANK: BankService, private readonly ROUTER: Router, private readonly ACTIVEROUTE: ActivatedRoute) { }

    ngOnInit(): void {
        this.BANK.list().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.banks = response.result || [];
            }
        });
    }

    toAddView(): void {
        this.ROUTER.navigate(['add'], { relativeTo: this.ACTIVEROUTE });
    }
}
