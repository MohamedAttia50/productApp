/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFnInterceptor } from './app/auth-fn-interceptor';
import { provideRouter, Route } from '@angular/router';
import { routes } from './app/app.routes';



bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptorFnInterceptor
      ])
    )
  ]
}).catch(err => console.error(err));
