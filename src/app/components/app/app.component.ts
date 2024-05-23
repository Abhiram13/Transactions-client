import { AfterContentInit, Attribute, Component, ContentChild, Directive, ElementRef, HostBinding, HostListener, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "../../routes/login/login.component";

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, LoginComponent],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   interpolation: ['(', ')']
})
export class AppComponent implements AfterContentInit {   
   title = 'Transactions-client';

   constructor() { }

   ngAfterContentInit(): void {
   }
}
