import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Observable } from "rxjs";

// @Injectable({ providedIn: 'root' })
// export class Interceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const request = req?.clone({
//             setHeaders: {
//                'API_KEY': 'Some Random Key HERE'
//             }
//         });

//         return next.handle(request);
//     }
// }