import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BankService } from '../../../services/bank.service';
import { BankNS, StatusCode } from "../../../types/export.types";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';

type DialogInputs = 'Yes' | 'No';

@Component({
    selector: 'bank-list',
    standalone: true,
    imports: [MatDividerModule, MatListModule, CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class BankListComponent {
    banks: BankNS.IList[] = [];

    constructor(
        private readonly BANK: BankService, 
        private readonly ROUTER: Router, 
        private readonly ACTIVEROUTE: ActivatedRoute, 
        private readonly FOOTER: FooterService,
        private readonly DIALOG: MatDialog,
    ) { }

    ngOnInit(): void {
        try {
            this.BANK.list<BankNS.IList[]>().subscribe(response => {
                if (response.status_code === StatusCode.OK) {
                    this.banks = response.result || [];
                } else {
                    this.FOOTER.invoke(response?.message || "Something went wrong", "Dismiss");
                }
            }, error => {
                this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
            });         
        } catch (e: any) {
            this.FOOTER.invoke(e?.message || "Something went wrong", "Dismiss");
        }        
    }

    openDialog(id: string) {
        this.DIALOG.open(DeleteDialogComponent).afterClosed().subscribe((result: DialogInputs) => {
            if (result === 'Yes') {
                this.BANK.delete(id).subscribe(response => {
                    this.FOOTER.invoke(response?.message as string, 'Dismiss');
                    this.ngOnInit();
                });
            }
        })
    }

    toEditView(id: string): void {
        this.ROUTER.navigate([`edit/${id}`], {relativeTo: this.ACTIVEROUTE});
    }

    toAddView(): void {
        this.ROUTER.navigate(['add'], { relativeTo: this.ACTIVEROUTE });
    }
}
