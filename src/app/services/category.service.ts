import { HttpService } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, CategoryNS } from "../types/export.types";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    private readonly PREFIX: string = "/category";

    constructor(private readonly HTTP: HttpService) { }

    list(): Observable<IApiResonse<CategoryNS.IList[]>> {
        return this.HTTP.get<CategoryNS.IList[]>(this.PREFIX);
    }

    insert(body: CategoryNS.IPayload): Observable<IApiResonse> {
        return this.HTTP.post<CategoryNS.IPayload, IApiResonse>(this.PREFIX, body);
    }
}