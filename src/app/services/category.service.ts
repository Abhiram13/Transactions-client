import { HttpService } from "./export.service";
import { IComponentService } from "../types/export.types";
import { Injectable } from "@angular/core";
import { ComponentService } from "./export.service";

@Injectable({ providedIn: 'root' })
export class CategoryService extends ComponentService implements IComponentService {
    protected override readonly PREFIX: string = "/category";

    constructor(protected override readonly HTTP: HttpService) { 
        super(HTTP);
    }
}