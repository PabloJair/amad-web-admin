import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {
  ApplicationNavigate,
  AuthenticationInformationService,
  HeadersInterceptor,
  UrlInterceptor,
} from '@amad-web-admin/modules/core';
import { provideStore } from '@ngrx/store';
import { metaReducers } from '@amad-web-admin/modules/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromApplication from '@amad-web-admin/modules/core';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: environment.apiUrl,
    },
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    importProvidersFrom(HttpClientModule),
    provideRouter(
      appRoutes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation(),
    ),
    provideStore(fromApplication.appStoreReducer, {
      metaReducers: metaReducers,
    }),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideAnimationsAsync(),
    AuthenticationInformationService,
    ApplicationNavigate,
  ],
};
