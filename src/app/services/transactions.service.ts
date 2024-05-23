import { HttpParams } from "@angular/common/http";
import { HttpService, CreateParams } from "./export.service";
import { Observable } from "rxjs";
import { IApiResonse, IListByDate } from "../types/export.types";
import { Injectable } from "@angular/core";

interface IListParams {
    date: string;
}

@Injectable({providedIn: 'root'})
export class TransactionService {
    private readonly PREFIX: string = "/transactions";
    constructor(private http: HttpService) {}

    listByDate(params?: Partial<IListParams>): Observable<IApiResonse<IListByDate[]>> {
        const PARAMS: HttpParams = CreateParams(params);

        return this.http.get<IListByDate[]>(this.PREFIX, PARAMS);
    }
}