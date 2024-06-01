import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import { CategoryNS, StatusCode } from "../../../types/export.types";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';
import { MatIconModule } from '@angular/material/icon'

type DialogInputs = 'Yes' | 'No';

@Component({
    selector: 'category-list',
    standalone: true,
    imports: [MatDividerModule, MatListModule, CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class CategoryListComponent implements OnInit {
    categories: CategoryNS.IList[] = [];

    constructor(
        private readonly CATEGORY: CategoryService, 
        private readonly ROUTER: Router, 
        private readonly ACTIVEROUTE: ActivatedRoute, 
        private readonly FOOTER: FooterService,
        private readonly DIALOG: MatDialog,
    ) { }

    ngOnInit(): void {
        try {
            this.CATEGORY.list<CategoryNS.IList[]>().subscribe(response => {
                if (response.status_code === StatusCode.OK) {
                    this.categories = response.result || [];
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
                this.CATEGORY.delete(id).subscribe(response => {
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
