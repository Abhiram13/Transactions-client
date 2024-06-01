import { HttpParams } from "@angular/common/http";
import { IComponentService, IApiResonse } from "../types/export.types";
import { HttpService } from "./export.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

export function CreateParams<T extends object>(object?: T): HttpParams {
    const PARAMS: HttpParams = new HttpParams();
    
    if (!object) return PARAMS;
    
    Object.entries(object).map(([k, v]) => PARAMS.set(k, v));
    return PARAMS;
}

@Injectable({ providedIn: 'root' })
export class ComponentService implements IComponentService {
    protected PREFIX: string = "";

    constructor(protected readonly HTTP: HttpService) { }

    list<Result extends object>(): Observable<IApiResonse<Result>> {
        return this.HTTP.get<Result>(this.PREFIX);
    }

    delete(id: string): Observable<IApiResonse<{}>> {
        return this.HTTP.delete(this.PREFIX + '/' + id);
    }

    insert<Payload>(payload: Payload): Observable<IApiResonse<{}>> {
        return this.HTTP.post<Payload, IApiResonse>(this.PREFIX, payload);
    }

    searchById<Result extends object>(id: string): Observable<IApiResonse<Result>> {
        return this.HTTP.searchById(this.PREFIX + '/' + id);
    }

    update<Payload>(id: string, body: Payload): Observable<IApiResonse<{}>> {
        return this.HTTP.update(this.PREFIX + '/' + id, body);
    }
}