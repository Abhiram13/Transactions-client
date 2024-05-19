import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { LoginType, StatusCode } from '../../types/export.types';
import { Router } from '@angular/router';

@Component({
   selector: 'login',
   standalone: true,
   imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
   templateUrl: './login.component.html',
   styleUrl: './login.component.scss'
})
export class LoginComponent {
   loginForm!: FormGroup;

   //'^[a-zA-Z]+@[a-z]+$'
   constructor(private http: HttpService, private route: Router) { 
      this.loginForm = new FormGroup({
         user_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
         password: new FormControl('', [Validators.required])
      });
   }

   get user_name(): FormControl {
      return this.loginForm.get('user_name') as FormControl;
   }

   get password(): FormControl {
      return this.loginForm.get('password') as FormControl;
   }

   submit() {
      const payload: LoginType.IPayload = {
         user_name: this.loginForm.get('user_name')?.value || "",
         password: this.loginForm.get('password')?.value || "",
      }

      this.http.post<LoginType.IPayload, LoginType.IResponse>("login", payload).subscribe(response => {
         if (response?.status === StatusCode.OK) {
            this.route.navigate(['/dashboard']);
         }
      });
   }
}
