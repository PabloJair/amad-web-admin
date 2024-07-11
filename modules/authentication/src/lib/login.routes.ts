import { Route } from '@angular/router';
import { ModulesAuthenticationComponent } from './modules-authentication/modules-authentication.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationFacade } from './+state/authentication.facade';
import {
  ApplicationNavigate,
  AuthenticationInformationService,
} from '@amad-web-admin/modules/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthenticationEffects } from './+state/authentication.effects';
import * as fromAuthentication from './+state/authentication.reducer';

export const modulesAuthenticationRoutes: Route[] = [
  {
    path: '',
    component: ModulesAuthenticationComponent,
    providers: [
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { floatLabel: 'always' },
      },
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: { appearance: 'outline' },
      },
    ],
    children: [
      {
        path: '',
        component: LoginComponent,
        providers: [
          AuthenticationFacade,
          ApplicationNavigate,
          AuthenticationInformationService,
          provideState(fromAuthentication.authenticationFeature),
          provideEffects(AuthenticationEffects),
        ],
      },
    ],
  },
];
