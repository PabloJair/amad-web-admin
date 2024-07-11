import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as networkModule from '@amad-web-admin/modules/network';
import * as coreModule from '@amad-web-admin/modules/core';
import { authenticationAction } from './authentication.actions';
@Injectable()
export class AuthenticationEffects {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.AuthenticationService);
  private authenticationService$ = inject(
    coreModule.AuthenticationInformationService,
  );
  requestFirstLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationAction.loginRequest),
      switchMap(request => {
        return this.service$.login(request.request).pipe(
          map(response => {
            const data = response.data;
            data.token = response.token;
            return authenticationAction.successFistLogin({
              value: data,
            });
          }),
          catchError(error => of(authenticationAction.fail(error.error))),
        );
      }),
    ),
  );
  requestSecondLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationAction.login2F),
      switchMap(request => {
        return this.service$.login2Fa(request.request, request.token).pipe(
          map(response => {
            this.authenticationService$.createSession(response);
            return authenticationAction.successLogin({
              value: response.data,
            });
          }),
          catchError(error => of(authenticationAction.fail(error.error))),
        );
      }),
    ),
  );
}
