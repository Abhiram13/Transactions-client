import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { FooterService } from '../../../services/footer.service';
import { CategoryNS, StatusCode } from '../../../types/export.types';
import { ConfigureComponent } from '../../banks/configure/configure.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'category-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss'
})
export class CategoryConfigureComponent extends ConfigureComponent<CategoryService> {
    public override formGroup!: FormGroup;

    constructor(
        protected override readonly BUILDER: FormBuilder, 
        protected override readonly SERVICE: CategoryService, 
        protected override readonly FOOTER: FooterService, 
        protected override readonly ACTIVEROUTE: ActivatedRoute,
        protected override readonly LOCATION: Location
    ) {
        super(BUILDER, FOOTER, ACTIVEROUTE, LOCATION, SERVICE);
    }

    override onSubmit(): void {
        try {
            const NAME = this.formGroup.get('name')?.value;

            this.SERVICE.insert<CategoryNS.IPayload>({ name: NAME })?.subscribe(this.postSubmit.bind(this), this.errorLog.bind(this));
        } catch (e: any) {
            this.FOOTER.invoke(e?.message || "Something went wrong", "Dismiss");
        }      
    }
}

@Component({
    selector: 'category-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss',
    
})
export class EditCategoryComponent extends ConfigureComponent<CategoryService> {
    public override formGroup!: FormGroup;
    public override action: string = "Update";
    private categoryId: string = "";

    constructor(
        protected override readonly BUILDER: FormBuilder, 
        protected override readonly SERVICE: CategoryService, 
        protected override readonly FOOTER: FooterService, 
        protected override readonly ACTIVEROUTE: ActivatedRoute,
        protected override readonly LOCATION: Location
    ) {
        super(BUILDER, FOOTER, ACTIVEROUTE, LOCATION, SERVICE);
        this.categoryId = this.ACTIVEROUTE?.snapshot?.params?.['id'];
        this.fetchCategory();
    }

    private fetchCategory(): void {
        this.SERVICE.searchById<CategoryNS.IList>(this.categoryId).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this.formGroup?.get('name')?.setValue(response?.result?.name || "");
            }
        });
    }

    override onSubmit(): void {
        try {
            const NAME = this.formGroup.get('name')?.value;

            this.SERVICE.update<CategoryNS.IPayload>(this.categoryId, { name: NAME, id: this.categoryId })?.subscribe(this.postSubmit.bind(this), this.errorLog.bind(this));
        } catch (e: any) {
            this.FOOTER.invoke(e?.message || "Something went wrong", "Dismiss");
        }      
    }
}
