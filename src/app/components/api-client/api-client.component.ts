import { Component, ViewChild } from '@angular/core';
import { InputFieldDirective } from '../../directives/input-directive/input-field.directive';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
   selector: 'api-client',
   standalone: true,
   imports: [InputFieldDirective, MatInputModule, MatButtonModule, ReactiveFormsModule],
   templateUrl: './api-client.component.html',
   styleUrl: './api-client.component.scss'
})
export class ApiClientComponent {
   @ViewChild(InputFieldDirective) 
   input!: InputFieldDirective;
   loginForm!: FormGroup;

   constructor(private http: HttpService) { 
      this.loginForm = new FormGroup({
         user_name: new FormControl(''),
         password: new FormControl('')
      });
   }

   get user_name(): FormControl {
      return this.loginForm.get('user_name') as FormControl;
   }

   get password(): FormControl {
      return this.loginForm.get('password') as FormControl;
   }

   submit() {
      console.log(this.loginForm.get('user_name')?.value);
      console.log(this.loginForm.get('password')?.value)
   }

   sendHttpRequest() {
      this.http.get<any>(this.input.value).subscribe(response => {
         console.log({response});
      })
   }
}
