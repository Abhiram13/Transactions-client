import { HttpParams } from "@angular/common/http";
import { HttpService, CreateParams } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, TransactionNS, IComponentService } from "../types/export.types";
import { Injectable } from "@angular/core";
import { ComponentService } from "./export.service";

@Injectable({providedIn: 'root'})
export class TransactionService extends ComponentService implements IComponentService {
    protected override readonly PREFIX: string = "/transactions";

    constructor(protected override readonly HTTP: HttpService) {
        super(HTTP);
    }

    listByDate(params?: Partial<TransactionNS.IListParams>): Observable<IApiResonse<TransactionNS.IListByDate[]>> {
        const PARAMS: HttpParams = CreateParams(params);

        return this.HTTP.get<TransactionNS.IListByDate[]>(this.PREFIX, PARAMS);
    }
}