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

    listByDate(date: string): Observable<IApiResonse<TransactionNS.IDataByDate>> {
        return this.HTTP.get<TransactionNS.IDataByDate>(this.PREFIX + '/' + date);
    }
}