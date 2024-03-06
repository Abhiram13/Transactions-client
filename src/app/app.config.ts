import { ApplicationConfig, importProvidersFrom, Provider } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {   
   providers: [
      provideRouter(routes),
      provideAnimationsAsync(), 
      importProvidersFrom(HttpClientModule),
   ],
};
