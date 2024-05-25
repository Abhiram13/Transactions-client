import { HttpService } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, ICategoryList } from "../types/export.types";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private readonly PREFIX: string = "/category";

    constructor(private readonly HTTP: HttpService) { }

    list(): Observable<IApiResonse<ICategoryList[]>> {
        return this.HTTP.get<ICategoryList[]>(this.PREFIX);
    }
}