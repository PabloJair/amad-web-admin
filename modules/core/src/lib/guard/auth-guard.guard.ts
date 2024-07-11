import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthenticationInformationService,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authenticationInformationService$ = inject(
    AuthenticationInformationService,
  );
  return authenticationInformationService$.isAuthenticate()
    ? true
    : inject(Router).createUrlTree([
        `/${NavigationRoutes.authentication.AUTHENTICATION}`,
      ]);
};
