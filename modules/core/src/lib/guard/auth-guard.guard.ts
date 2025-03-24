import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { inject } from '@angular/core';
import { AuthenticationInformationService } from '../security/auth/authentication-information.service';
import { NavigationRoutes } from '../navigation/application.routers';

export const AuthGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authenticationInformationService$ = inject(AuthenticationInformationService);
  return authenticationInformationService$.isAuthenticate()
    ? true
    : inject(Router).createUrlTree([`/${NavigationRoutes.authentication.AUTHENTICATION}`]);
};
