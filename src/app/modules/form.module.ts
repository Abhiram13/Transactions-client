import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
   exports: [
      MatInputModule,
      MatSelectModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatDatepickerModule,
      MatSlideToggleModule
   ],
})
export class FormModule {};