import { HttpService } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, BankNS } from "../types/export.types";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BankService {
    private readonly PREFIX: string = "/bank";

    constructor(private readonly HTTP: HttpService) { }

    list(): Observable<IApiResonse<BankNS.IList[]>> {
        return this.HTTP.get<BankNS.IList[]>(this.PREFIX);
    }

    insert(body: BankNS.IPayload): Observable<IApiResonse> {
        return this.HTTP.post<BankNS.IPayload, IApiResonse>(this.PREFIX, body);
    }
}