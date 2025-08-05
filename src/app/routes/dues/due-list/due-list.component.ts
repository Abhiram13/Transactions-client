import { Component, OnInit } from '@angular/core';
import { DueService } from '../../../services/due.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DueListNS, StatusCode } from "../../../types/export.types";
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FooterService } from '../../../services/footer.service';

type DialogInputs = 'Yes' | 'No';

@Component({
    selector: 'app-due-list',
    standalone: true,
    imports: [MatListModule, MatDividerModule, CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './due-list.component.html',
    styleUrl: './due-list.component.scss'
})
export class DueListComponent implements OnInit {
    public dues: DueListNS.IDue[] = [];

    constructor(
        private readonly _service: DueService, 
        private readonly _router: Router, 
        private readonly _activeRoute: ActivatedRoute,
        private readonly _dialog: MatDialog,
        private readonly _footer: FooterService
    ) { }

    ngOnInit(): void {
        this._fetchDues();
    }

    private _fetchDues(): void {
        this._service.list<DueListNS.IDue[]>().subscribe(response => {
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

    public openDialog(id: string) {
        this._dialog.open(DeleteDialogComponent).afterClosed().subscribe((result: DialogInputs) => {
            if (result === 'Yes') {
                this._service.delete(id).subscribe(response => {
                    if (response.status_code === StatusCode.OK) {
                        const message: string = response?.message || "Due deleted successfully";
                        this._footer.invoke(message, 'Dismiss');
                        this.ngOnInit();
                    } else if (response?.status_code === StatusCode.AMBIGUOUS) {
                        const message: string = response?.message || "Transactions are linked with the current due. So, cannot be deleted";
                        this._footer.invoke(message, 'Dismiss');
                    }  else {
                        const message: string = response?.message || "Something went wrong. Due cannot be deleted";
                        this._footer.invoke(message, 'Dismiss');
                    }
                });
            }
        })
    }
}
