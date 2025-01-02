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
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
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
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: environment.apiUrl,
    },
    {
      provide: 'BASE_API_URL_SEPOMEX',
      useValue: environment.apiURLSepomex,
    },
    {
      provide: 'BASE_API_KEY_SEPOMEX',
      useValue: environment.apiKeySepomex,
    },
    {
      provide: 'BASE_API_KEY_MONKEY',
      useValue: environment.apiKeyMonkey,
    },
    {
      provide: 'BASE_API_URL_MONKEY',
      useValue: environment.apiURLMonkey,
    },
    provideEnvironmentNgxMask(),
    BrowserAnimationsModule,
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      appRoutes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation()
    ),
    provideStore(fromApplication.appStoreReducer, {
      metaReducers: metaReducers,
    }),
    importProvidersFrom(
      NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-pulse' })
    ),
    {
      provide: NgxSpinnerService,
      useClass: NgxSpinnerService,
    },
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
