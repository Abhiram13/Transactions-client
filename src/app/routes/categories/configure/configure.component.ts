import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { FooterService } from '../../../services/footer.service';
import { StatusCode } from '../../../types/export.types';

@Component({
    selector: 'category-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss'
})
export class CategoryConfigureComponent {
    formGroup!: FormGroup;

    constructor(private readonly BUILDER: FormBuilder, private readonly SERVICE: CategoryService, private readonly FOOTER: FooterService) {
        this.formGroup = this.BUILDER.group({
            name: ['', [Validators.required]],
        });
    }

    get name(): FormControl {
        return this.formGroup.get("name") as FormControl;
    }

    onSubmit(): void {
        try {
            const NAME = this.formGroup.get('name')?.value;

            this.SERVICE.insert({ name: NAME }).subscribe(response => {
                if (response.status_code === StatusCode.CREATED) {
                    this.FOOTER.invoke("Category added successfully", "Dismiss");
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
}
