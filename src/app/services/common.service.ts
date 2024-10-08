import { HttpParams } from "@angular/common/http";
import { IComponentService, IApiResonse, QueryParams } from "../types/export.types";
import { HttpService } from "./export.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

export function CreateParams<T extends object>(object?: T): HttpParams {
    const PARAMS: HttpParams = new HttpParams();
    
    if (!object) return PARAMS;
    
    Object.entries(object).map(([k, v]) => PARAMS.set(k, v));
    return PARAMS;
}

/**
 * @Injectable
 * Common service used as extension for other base classes that need to perform CRUD operations
 */
@Injectable({ providedIn: 'root' })
export class ComponentService implements IComponentService {
    protected PREFIX: string = "";

    constructor(protected readonly HTTP: HttpService) { }

    private setQueryParams(queryParams: QueryParams): string {
        let params: string = "";

        Object.entries(queryParams)?.map(function ([key, value]) {
            params += params ? `&${key}=${value}` : `${key}=${value}`;
        });

        return params;
    }

    list<Result extends object>(queryParams?: QueryParams): Observable<IApiResonse<Result>> {
        let url: string = this.PREFIX;

        if (queryParams && Object.keys(queryParams)?.length) {
            url += `?${this.setQueryParams(queryParams)}`;
        }

        return this.HTTP.get<Result>(url);
    }

    delete(id: string): Observable<IApiResonse<{}>> {
        return this.HTTP.delete(this.PREFIX + '/' + id);
    }

    insert<Payload>(payload: Payload): Observable<IApiResonse<{}>> {
        return this.HTTP.post<Payload, IApiResonse>(this.PREFIX, payload);
    }

    searchById<Result extends object>(id: string): Observable<IApiResonse<Result>> {
        return this.HTTP.get(this.PREFIX + '/' + id);
    }

    update<Payload extends {}>(id: string, body: Payload): Observable<IApiResonse<{}>> {
        return this.HTTP.update<Payload>(this.PREFIX + '/' + id, body);
    }
}