import { inject, Injectable } from '@angular/core';
import { EndPointsAuthentication } from './end-points.authentication';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  BaseResponse,
  Login2fRequest,
  LoginRequest,
  LoginResponse,
  UserInformation,
} from '@amad-web-admin/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<BaseResponse<LoginResponse>> {
    return this.http.post<BaseResponse<LoginResponse>>(EndPointsAuthentication.LOGIN, loginRequest);
  }

  login2Fa(loginRequest: Login2fRequest, token: string): Observable<BaseResponse<UserInformation>> {
    return this.http.post<BaseResponse<UserInformation>>(
      EndPointsAuthentication.LOGIN_2F,
      loginRequest,
      {
        headers: {
          token: token,
        },
      }
    );
  }
}
