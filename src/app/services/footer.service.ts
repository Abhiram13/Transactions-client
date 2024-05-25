import { ContentChild, Injectable, ViewChild, ViewContainerRef } from "@angular/core";
import { FooterComponent } from "../components/footer/footer.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class FooterService {
    constructor (private readonly SNACK: MatSnackBar) {}

    invoke(message: string, action: string = "Dismiss"): void {
        this.SNACK.open(message, action, {duration: 4000});
    }
}