import { inject, Injectable } from '@angular/core';
import { EndPointsAuthentication } from './end-points.authentication';
import { UserInformation } from './entities/user-information';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from './entities/login.request';
import { Login2fRequest } from './entities/login-2f.request';
import { BaseResponse } from '../base-response';
import { LoginResponse } from './entities/login.response';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  http = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<BaseResponse<LoginResponse>> {
    return this.http.post<BaseResponse<LoginResponse>>(
      EndPointsAuthentication.LOGIN,
      loginRequest,
    );
  }
  login2Fa(
    loginRequest: Login2fRequest,
    token: string,
  ): Observable<BaseResponse<UserInformation>> {
    return this.http.post<BaseResponse<UserInformation>>(
      EndPointsAuthentication.LOGIN_2F,
      loginRequest,
      {
        headers: {
          token: token,
        },
      },
    );
  }
}
