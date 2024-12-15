import { CommonModule, Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BankService } from '../../../services/bank.service';
import { FooterService } from '../../../services/footer.service';
import { BankNS, IApiResonse, StatusCode } from '../../../types/export.types';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../../../services/export.service';

@Component({
    standalone: true,
    template: ''
})
export class ConfigureComponent<Service extends ComponentService> implements OnInit, OnDestroy {
    public formGroup!: FormGroup;
    public action: string = "Add";

    constructor (
        protected readonly BUILDER: FormBuilder,
        protected readonly FOOTER: FooterService,
        protected readonly ACTIVEROUTE: ActivatedRoute,
        protected readonly LOCATION: Location,
        @Inject(ComponentService) protected readonly SERVICE: Service,
    ) {
        this.formGroup = this.BUILDER.group({
            name: ['', [Validators.required]],
        });
    };

    public get name(): FormControl {
        return this.formGroup.get("name") as FormControl;
    }

    ngOnDestroy(): void { }

    ngOnInit(): void { }

    onSubmit(): void { }

    protected errorLog(error: any): void {
        this.FOOTER.invoke(error?.message || "Something went wrong", "Dismiss");
    }

    protected postSubmit(response: IApiResonse<{}>): void {
        if (response.status_code === StatusCode.CREATED) {
            this.FOOTER.invoke(response?.message as string, "Dismiss");
            this.LOCATION.back();
        } else {
            this.FOOTER.invoke(response?.message || "Something went wrong", "Dismiss");
        }
    }
}

@Component({
    selector: 'bank-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss'
})
export class BankAddComponent extends ConfigureComponent<BankService> {
    constructor (
        protected override readonly BUILDER: FormBuilder,
        protected override readonly FOOTER: FooterService,
        protected override readonly ACTIVEROUTE: ActivatedRoute,
        protected override readonly LOCATION: Location,
        protected override readonly SERVICE: BankService,
    ) {
        super(BUILDER, FOOTER, ACTIVEROUTE, LOCATION, SERVICE);
    }

    override onSubmit(): void {
        try {
            const NAME = this.formGroup.get('name')?.value;

            this.SERVICE.insert<BankNS.IPayload>({ name: NAME })?.subscribe(this.postSubmit.bind(this), this.errorLog.bind(this));
        } catch (e: any) {
            this.FOOTER.invoke(e?.message || "Something went wrong", "Dismiss");
        }
    }
}

@Component({
    selector: 'bank-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatButtonModule],
    templateUrl: './configure.component.html',
    styleUrl: './configure.component.scss'
})
export class BankEditComponent extends ConfigureComponent<BankService> {
    private bankId: string;
    public override action: string = 'Update';

    constructor (
        protected override readonly BUILDER: FormBuilder,
        protected override readonly SERVICE: BankService,
        protected override readonly FOOTER: FooterService,
        protected override readonly ACTIVEROUTE: ActivatedRoute,
        protected override readonly LOCATION: Location,
    ) {
        super(BUILDER, FOOTER, ACTIVEROUTE, LOCATION, SERVICE);
        this.bankId = this.ACTIVEROUTE?.snapshot?.params?.['id'];
        this.fetchBank();
    }

    private fetchBank(): void {
        this.SERVICE.searchById<BankNS.IList>(this.bankId).subscribe(response => {
            if (response?.status_code === StatusCode.OK) {
                this.formGroup?.get('name')?.setValue(response?.result?.name || "");
            }
        });
    }

    override onSubmit(): void {
        try {
            const NAME = this.formGroup.get('name')?.value;

            this.SERVICE.update(this.bankId, { name: NAME, id: this.bankId })?.subscribe(this.postSubmit.bind(this), this.errorLog.bind(this));
        } catch (e: any) {
            this.FOOTER.invoke(e?.message || "Something went wrong", "Dismiss");
        }
    }
}
