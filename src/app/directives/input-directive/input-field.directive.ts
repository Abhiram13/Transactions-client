import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
   selector: '[myInput]',
   standalone: true,   
})
export class InputFieldDirective {
   public value: string = "";

   constructor(private e: ElementRef<HTMLInputElement>) { 
      this.e.nativeElement.placeholder = "Enter URL or Paste text"
      this.e.nativeElement.value = this.value;
   }

   @HostListener("input", ["$event"])
   onChange(event: any) {
      this.value = event.target.value || "";
   }
}
