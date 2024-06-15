import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { AppDirective } from '../../directives/directives';

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [MatListModule, MatDividerModule, AppDirective],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    constructor(private readonly ROUTER: Router) {}

    toTransactions(): void {
        this.ROUTER.navigateByUrl("/transactions");
    }

    toCategories(): void {
        this.ROUTER.navigateByUrl("/categories");
    }

    toBanks(): void {
        this.ROUTER.navigateByUrl("/banks");
    }
}
