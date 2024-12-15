import { Component, OnInit } from '@angular/core';
import { DueService } from '../../../services/due.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface IDue {
    description: string;
    to_bank: string;
    amount: number;
    status: number;
    id: string;
}

@Component({
    selector: 'app-due-list',
    standalone: true,
    imports: [MatListModule, MatDividerModule, CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './due-list.component.html',
    styleUrl: './due-list.component.scss'
})
export class DueListComponent implements OnInit {
    public dues: IDue[] = [];

    constructor(private readonly _service: DueService, private readonly _router: Router, private readonly _activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this._fetchDues();
    }

    private _fetchDues(): void {
        this._service.list<IDue[]>().subscribe(response => {
            this.dues = response?.result || [];
        });
    }

    public toDueTransactions(dueId: string): void {
        this._router.navigate([dueId], {relativeTo: this._activeRoute});
    }

    public toAddView(): void {
        this._router.navigate(['add'], { relativeTo: this._activeRoute });
    }

    public toEditView(dueId: string): void {
        this._router.navigate(['edit/' + dueId], { relativeTo: this._activeRoute });
    }
}
