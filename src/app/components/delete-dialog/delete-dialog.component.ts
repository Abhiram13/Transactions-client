import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogRef
} from '@angular/material/dialog';

@Component({
    selector: 'delete-dialog',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    templateUrl: './delete-dialog.component.html',
    styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent implements OnInit {
    constructor (private readonly REF: MatDialogRef<DeleteDialogComponent>) {}

    ngOnInit(): void { }

    close(result: string): void {
        this.REF.close(result);
    }
}
