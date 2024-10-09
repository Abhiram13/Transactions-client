import { Component, SimpleChanges } from "@angular/core";

@Component({template: ""})
export abstract class AngularComponent {
    abstract ngOnInit(): void;
    abstract ngOnChanges(changes: SimpleChanges): void;    
    abstract ngOnDestroy(): void;    
}