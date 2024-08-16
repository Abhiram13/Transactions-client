import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpResponseInterceptor } from "../app/services/http.interceptor";

export const appConfig: ApplicationConfig = {   
   providers: [
      provideRouter(routes),
      provideAnimationsAsync(), 
      importProvidersFrom(HttpClientModule),
      provideHttpClient(withInterceptorsFromDi()),
      {
         provide: HTTP_INTERCEPTORS,
         useClass: HttpResponseInterceptor,
         multi: true
      }
   ],   
};
