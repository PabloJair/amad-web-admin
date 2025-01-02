import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonsStrings } from '../utils/commons.strings';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    @Inject('BASE_API_URL_SEPOMEX') private apiURLSepomex: string,
    @Inject('BASE_API_URL_MONKEY') private apiURLMonkey: string
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.has(CommonsStrings.MONKEY_API)) {
      const modifiedHeaders = request.headers.delete(CommonsStrings.MONKEY_API);
      return next.handle(
        request.clone({
          url: `${this.apiURLMonkey}/${request.url}`,
          headers: modifiedHeaders,
        })
      );
    }
    if (request.headers.has(CommonsStrings.HEADER_SEPOMEX_URL)) {
      const modifiedHeaders = request.headers.delete(
        CommonsStrings.HEADER_SEPOMEX_URL
      );
      return next.handle(
        request.clone({
          url: `${this.apiURLSepomex}${request.url}`,
          headers: modifiedHeaders,
        })
      );
    }
    return next.handle(
      request.clone({
        url: `${this.baseUrl}${request.url}`,
      })
    );
  }
}
