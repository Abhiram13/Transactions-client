import { ContentChild, Injectable, ViewChild, ViewContainerRef } from "@angular/core";
import { FooterComponent } from "../components/footer/footer.component";

@Injectable({ providedIn: 'root' })
export class FooterService {

    constructor() {
        // this.footerElement = ViewChild('footer', {read: ViewContainerRef});
    }

    invoke() {
        // this.footerElement.createComponent(FooterComponent);        
    }
}