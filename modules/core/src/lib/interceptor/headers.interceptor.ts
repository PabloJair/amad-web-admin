import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationInformationService } from '../security/auth/authentication-information.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  private bearer = 'Bearer ';
  constructor(private auth: AuthenticationInformationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let newApiRequest = request;
    if (this.auth.isAuthenticate()) {
      newApiRequest = request.clone({
        setHeaders: {
          token: `${this.auth.getUserInformation()?.token ?? ''}`,
        },
      });
    }

    return next.handle(newApiRequest);
  }
}
