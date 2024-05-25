import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
    text: string ="";
    
    constructor() { 
        console.log("invoked");
    }
    
    ngOnInit(): void {
    }
}
