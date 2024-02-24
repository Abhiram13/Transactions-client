import { AfterContentInit, Attribute, Component, ContentChild, Directive, ElementRef, HostBinding, HostListener, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Directive({
   selector: 'h1',
   standalone: true,
})
class Red {
   color: string = "red";
   
   constructor(private e: ElementRef<HTMLElement>, @Attribute('class') class_head: string) {
      this.e.nativeElement.style.color = this.color;
      console.log(class_head);
   }

   @HostListener('click')
   onClick() {
      this.color = "green";
   }
}

@Injectable({providedIn: 'platform'})
class NonInjectable {
   public run() { }
}

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet, Red],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss',
   interpolation: ['(', ')']
})
export class AppComponent implements AfterContentInit {
   @ContentChild(Red) h1!: Red;
   @HostBinding('style.color') color: string = "red"; 
   title = 'sample-project';

   constructor(private inject: NonInjectable) {
      this.inject.run()      
   }

   @HostListener('click')
   onClick() {
      this.color = "green";
   }

   ngAfterContentInit(): void {
      console.log(this.h1)
   }
}
