import { inject, Injectable } from "@angular/core";
import { IApiResonse, IComponentService } from "../types/common.types";
import { ComponentService } from "./common.service";
import { HttpService } from "./http.service";
import { Observable } from "rxjs";
import { BigQueryNS } from "../types/dashboard.types";

@Injectable({providedIn: 'any'})
export class BigQueryService extends ComponentService implements IComponentService {
    protected override readonly PREFIX: string = "/api/query";

    constructor(protected override readonly HTTP: HttpService) {
        super(HTTP);
    }

    public transactionsListByMonth(month?: number, year?: number): Observable<IApiResonse<BigQueryNS.ITransactionsListByMonth[]>> {
        const DATE: Date = new Date();
        const MONTH: number = month || DATE.getMonth() + 1;
        const YEAR: number = year || DATE.getFullYear();

        return this.HTTP.get<BigQueryNS.ITransactionsListByMonth[]>(`${this.PREFIX}/transactionsByMonth?month=${MONTH}&year=${YEAR}`);
    }
}