import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
   selector: '[myInput]',
   standalone: true,   
})
export class InputFieldDirective {
   
   constructor(private e: ElementRef<HTMLInputElement>) { 
      this.e.nativeElement.placeholder = "Enter URL or Paste text"
      this.e.nativeElement.value = "";
   }

   @HostListener("input", ["$event"])
   onChange(event: any) {
      console.log(event.target.value);
   }
}
