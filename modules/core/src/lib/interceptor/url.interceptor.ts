import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonsStrings } from '../utils/commons.strings';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    @Inject('BASE_API_URL_SEPOMEX') private apiURLSepomex: string
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
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
