// import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
// import { Injectable, Provider } from "@angular/core";
// import { Observable } from "rxjs";

// @Injectable({providedIn: 'root'})
// export class Interceptor implements HttpInterceptor {
//    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//       const request = req?.clone({
//          // setHeaders: {
//          //    'Access-Control-Allow-Origin': '*',
//          //    'Expires': '0'
//          // }
//       });

//       console.log('hi');

//       return next.handle(request);
//    }
// }