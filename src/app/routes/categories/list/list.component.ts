import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CategoryService } from '../../../services/category.service';
import { ICategoryList, StatusCode } from "../../../types/export.types";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'category-list',
    standalone: true,
    imports: [MatDividerModule, MatListModule, CommonModule, MatButtonModule],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class CategoryListComponent implements OnInit {
    categories: ICategoryList[] = [];

    constructor(private readonly CATEGORY: CategoryService, private readonly ROUTER: Router, private readonly ACTIVEROUTE: ActivatedRoute) { }

    ngOnInit(): void {
        this.CATEGORY.list().subscribe(response => {
            if (response.status_code === StatusCode.OK) {
                this.categories = response.result || [];
            }
        });
    }

    toAddView(): void {
        this.ROUTER.navigate(['add'], { relativeTo: this.ACTIVEROUTE });
    }
}
