import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResonse } from "../types/export.types";

@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly API: string;

    constructor(private http: HttpClient) {
        this.API = "https://budget-tracker-dotnet-edu262f3lq-uc.a.run.app";
    }

    /**
     * @param url Endpoint URL with no forward slash `/`
     * @param params Optional query params
     * @template T represents the type of response object within `IApiResponse` interface
     * @returns {Observable<IApiResonse<T>>}
     */
    get<T extends object>(url: string, params?: HttpParams): Observable<IApiResonse<T>> {        
        return this.http.get<IApiResonse<T>>(`${this.API}${url}`, {params});
    }

    /**
     * @param url Endpoint URL with no forward slash `/`
     * @param body Payload to insert
     * @template P represents the type of request payload object
     * @template R represents the type of response object
     * @returns {Observable<IApiResonse<R>>}
     */
    post<P, R extends {}>(url: string, body: P): Observable<IApiResonse<R>> {
        const headers = new HttpHeaders();
        return this.http.post<IApiResonse<R>>(`${this.API}${url}`, body, { headers });
    }

    delete(url: string): Observable<IApiResonse> {
        return this.http.delete<IApiResonse>(`${this.API}${url}`);
    }

    searchById<R extends {}>(url: string): Observable<IApiResonse<R>> {
        return this.http.get<IApiResonse<R>>(`${this.API}${url}`);
    }

    update(url: string, body: any): Observable<IApiResonse> {
        return this.http.patch<IApiResonse>(`${this.API}${url}`, body);
    }
}