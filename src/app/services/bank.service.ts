import { HttpService } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, IBankList } from "../types/export.types";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BankService {
    private readonly PREFIX: string = "/bank";

    constructor(private readonly HTTP: HttpService) { }

    list(): Observable<IApiResonse<IBankList[]>> {
        return this.HTTP.get<IBankList[]>(this.PREFIX);
    }
}