import { HttpService } from "./export.service";
import { IApiResonse, IComponentService, TransactionNS } from "../types/export.types";
import { Injectable } from "@angular/core";
import { ComponentService } from "./export.service";
import { Observable } from "rxjs";

interface IResult {
    description: string;
    amount: number;
    status: number;
    transactions: TransactionNS.ITransactionInsertPayload[];
}

@Injectable({ providedIn: 'root' })
export class DueService extends ComponentService implements IComponentService {
    protected override readonly PREFIX: string = "/dues";

    constructor(protected override readonly HTTP: HttpService) {
        super(HTTP);
    }

    public dueTransactions(dueId: string): Observable<IApiResonse<IResult>> {
        return this.HTTP.get<IResult>(`${this.PREFIX}/${dueId}/transactions`);
    }
}