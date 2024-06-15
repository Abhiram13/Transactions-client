import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DueNS } from '../../../../types/dashboard.types';

@Component({
    selector: 'due-configure',
    standalone: true,
    imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, MatSelectModule],
    templateUrl: './due-configure.component.html',
    styleUrl: './due-configure.component.scss'
})
export class DueConfigureComponent implements OnChanges {
    public dueFormGroup!: FormGroup;

    @Input() isSubmitTriggered: boolean = false;
    @Output() duePayload = new EventEmitter<DueNS.IPayload>();

    @ViewChild("formDirective")
    formDirective!: FormGroupDirective;

    constructor(private readonly BUILDER: FormBuilder) {
        this.dueFormGroup = this.BUILDER.group({
            from: ['', [Validators.required]],
            to: ['', [Validators.required]],
            total_amount: [0, [Validators.required]],
            due_amount: [0],
            due_status: [DueNS.DueStatus.Pending]
        });
    }

    public get from(): FormControl {
        return this.dueFormGroup.get('from') as FormControl;
    }

    public get due_status(): FormControl {
        return this.dueFormGroup.get("due_status") as FormControl;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.isSubmitTriggered) {
            this.duePayload.emit({
                due_amount: 0,
                from: "Abhi",
                status: DueNS.DueStatus.Pending,
                to: "Revathi",
                total_amount: 0,
                transaction_id: ""
            });
        }
    }
}
