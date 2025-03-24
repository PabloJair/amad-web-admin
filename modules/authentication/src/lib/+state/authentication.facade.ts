import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { authenticationFeature } from './authentication.reducer';
import { skip } from 'rxjs';
import { authenticationAction } from './authentication.actions';
import { Login2fRequest, LoginRequest } from '@amad-web-admin/shared';

@Injectable()
export class AuthenticationFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(authenticationFeature.selectLoaded), skip(1));
  successLogin$ = this.store.pipe(select(authenticationFeature.selectUserInformation), skip(1));
  selectShowGoogleCode$ = this.store.pipe(
    select(authenticationFeature.selectShowGoogleCode),
    skip(1)
  );
  fail$ = this.store.pipe(select(authenticationFeature.selectError), skip(1));

  login(request: LoginRequest) {
    this.undo();
    this.store.dispatch(authenticationAction.loginRequest({ request }));
  }

  login2f(request: Login2fRequest, token: string) {
    this.undo();
    this.store.dispatch(authenticationAction.login2F({ request, token }));
  }

  undo() {
    this.store.dispatch(authenticationAction.undo());
  }
}
