import { AfterContentInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, FooterComponent],
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
