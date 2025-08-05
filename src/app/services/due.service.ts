import { HttpService } from "./export.service";
import { IApiResonse, IComponentService, DueDetailsNS } from "../types/export.types";
import { Injectable } from "@angular/core";
import { ComponentService } from "./export.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DueService extends ComponentService implements IComponentService {
    protected override readonly PREFIX: string = "/dues";

    constructor(protected override readonly HTTP: HttpService) {
        super(HTTP);
    }

    public dueTransactions(dueId: string): Observable<IApiResonse<DueDetailsNS.IDueTransactions>> {
        return this.HTTP.get<DueDetailsNS.IDueTransactions>(`${this.PREFIX}/${dueId}/transactions`);
    }
}