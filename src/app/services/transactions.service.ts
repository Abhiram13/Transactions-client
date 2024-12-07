import { HttpParams } from "@angular/common/http";
import { HttpService, CreateParams } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, TransactionNS, IComponentService } from "../types/export.types";
import { Injectable } from "@angular/core";
import { ComponentService } from "./export.service";

type ListByCategory = TransactionNS.ListByCategory.IResult;
type ListByBank = TransactionNS.ListByBank.IResult;

@Injectable({providedIn: 'any'})
export class TransactionService extends ComponentService implements IComponentService {
    protected override readonly PREFIX: string = "/transactions";

    constructor(protected override readonly HTTP: HttpService) {
        super(HTTP);
    }

    public listByDate(date: string): Observable<IApiResonse<TransactionNS.IDataByDate>> {
        return this.HTTP.get<TransactionNS.IDataByDate>(this.PREFIX + '/date/' + date);
    }

    public listByCategory(categoryId: string, month: string | null, year: string | null): Observable<IApiResonse<ListByCategory>> {
        let params: HttpParams = new HttpParams();
        if (month) params = params.append("month", month);
        if (year) params = params.set("year", year);

        return this.HTTP.get<ListByCategory>(`${this.PREFIX}/category/${categoryId}`, params);
    }

    public listByBank(bankId: string, month: string | null, year: string | null): Observable<IApiResonse<ListByBank>> {
        let params: HttpParams = new HttpParams();
        if (month) params = params.append("month", month);
        if (year) params = params.set("year", year);

        return this.HTTP.get<ListByBank>(this.PREFIX + '/bank/' + bankId, params);
    }
}
