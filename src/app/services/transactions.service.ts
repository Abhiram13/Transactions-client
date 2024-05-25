import { HttpParams } from "@angular/common/http";
import { HttpService, CreateParams } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, TransactionNS } from "../types/export.types";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TransactionService {
    private readonly PREFIX: string = "/transactions";

    constructor(private readonly HTTP: HttpService) {}

    listByDate(params?: Partial<TransactionNS.IListParams>): Observable<IApiResonse<TransactionNS.IListByDate[]>> {
        const PARAMS: HttpParams = CreateParams(params);

        return this.HTTP.get<TransactionNS.IListByDate[]>(this.PREFIX, PARAMS);
    }

    insert(body: TransactionNS.ITransactionInsertPayload): Observable<IApiResonse> {
        return this.HTTP.post<TransactionNS.ITransactionInsertPayload, IApiResonse>(this.PREFIX, body);
    }
}