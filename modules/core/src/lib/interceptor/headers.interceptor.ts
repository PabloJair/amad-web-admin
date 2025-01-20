import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationInformationService } from '../security/auth/authentication-information.service';
import { CommonsStrings } from '../utils/commons.strings';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationInformationService,
    @Inject('BASE_API_KEY_SEPOMEX') private apiKeySepomex: string,
    @Inject('BASE_API_KEY_MONKEY') private apiKeyMonkey: string
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newApiRequest = request;
    if (this.auth.isAuthenticate()) {
      if (request.headers.has(CommonsStrings.MONKEY_API)) {
        let modifiedHeaders = request.headers.delete(CommonsStrings.MONKEY_API);
        modifiedHeaders = modifiedHeaders.append('api-key', this.apiKeyMonkey);
        newApiRequest = request.clone({
          headers: modifiedHeaders,
        });
        return next.handle(newApiRequest);
      }

      if (request.headers.has(CommonsStrings.HEADER_SEPOMEX_API)) {
        let modifiedHeaders = request.headers.delete(
          CommonsStrings.HEADER_SEPOMEX_API
        );
        modifiedHeaders = modifiedHeaders.append('api-key', this.apiKeySepomex);
        newApiRequest = request.clone({
          headers: modifiedHeaders,
        });
        return next.handle(newApiRequest);
      }
      newApiRequest = request.clone({
        setHeaders: {
          token: `${this.auth.getUserInformation()?.token ?? ''}`,
        },
      });
    }

    return next.handle(newApiRequest);
  }
}
