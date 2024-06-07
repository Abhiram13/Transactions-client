import {StatusCode} from "./export.types";
import { Observable } from "rxjs";

export interface IApiResonse<T extends object = {}> {
   status_code: StatusCode;
   message?: string;
   result?: T;
}

export interface IComponentService {
   list<Result extends object>(): Observable<IApiResonse<Result>>;
   insert<Payload>(payload: Payload): Observable<IApiResonse>;
   delete(id: string): Observable<IApiResonse>;
   searchById<Result extends object>(id: string): Observable<IApiResonse<Result>>;
   update<Payload extends {}>(id: string, body: Payload): Observable<IApiResonse>;
}