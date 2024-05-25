import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import { CategoryNS, StatusCode } from "../../../types/export.types";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { FooterService } from '../../../services/footer.service';

@Component({
    selector: 'category-list',
    standalone: true,
    imports: [MatDividerModule, MatListModule, CommonModule, MatButtonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class CategoryListComponent implements OnInit {
    categories: CategoryNS.IList[] = [];

    constructor(private readonly CATEGORY: CategoryService, private readonly ROUTER: Router, private readonly ACTIVEROUTE: ActivatedRoute, private readonly FOOTER: FooterService) { }

    ngOnInit(): void {
        try {
            this.CATEGORY.list().subscribe(response => {
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

    toAddView(): void {
        this.ROUTER.navigate(['add'], { relativeTo: this.ACTIVEROUTE });
    }
}
