import { HttpParams } from "@angular/common/http";

export function CreateParams<T extends object>(object?: T): HttpParams {
    const PARAMS: HttpParams = new HttpParams();
    
    if (!object) return PARAMS;
    
    Object.entries(object).map(([k, v]) => PARAMS.set(k, v));
    return PARAMS;
}