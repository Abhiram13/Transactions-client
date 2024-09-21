import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { catchError, map, Observable, Subject } from "rxjs";
import { FooterService } from "./footer.service";

declare var API_KEY: string;

@Injectable({ providedIn: 'root' })
export class HttpResponseInterceptor implements HttpInterceptor {
    constructor (private _footer: FooterService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        const REQUEST = req.clone({headers: req.headers.set('API_KEY', `${API_KEY}`)});

        return next
            .handle(REQUEST)
            .pipe(
                map(this._httpResponseHandler.bind(this)), 
                catchError(this._httpErrorHandler.bind(this))
            );
    }

    private _httpResponseHandler(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
            const RESPONSE: HttpResponse<any> = event;

            if (!RESPONSE?.body?.status_code || RESPONSE?.body?.status_code >= 400) {
                this._footer.invoke(RESPONSE?.body?.message || "Something went wrong!!", "Dismiss");
                return new HttpResponse();
            }             
        }
        return event;
    }

    private _httpErrorHandler(error: HttpErrorResponse) {
        if (error) {
            const MESSAGE: string = error?.error?.message || error?.message || "Something went wrong!!";
            this._footer.invoke(MESSAGE, "Dismiss");
        }

        return new Observable<HttpEvent<any>>();
    }
}