import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'category-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss'
})
export class CategoryConfigureComponent {
    formGroup!: FormGroup;

    constructor(private readonly BUILDER: FormBuilder) {
        this.formGroup = this.BUILDER.group({
            name: ['', [Validators.required]],
        });
    }

    get name(): FormControl {
        return this.formGroup.get("name") as FormControl;
    }

    onSubmit(): void {
        const NAME = this.formGroup.get('name')?.value;
    }
}
