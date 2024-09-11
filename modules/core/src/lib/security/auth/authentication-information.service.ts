import { Injectable } from '@angular/core';
import { LocalEncryptedService } from '../local-encrypter/local-encrypted.service';
import { BaseResponse, UserInformation } from '@amad-web-admin/modules/network';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { environment } from '../../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInformationService {
  constructor(private localEncrypted: LocalEncryptedService) {}

  private HAS_SESSION = 'HAS_SESSION';
  private PERMISSIONS = 'PERMISSIONS';
  private HAS_REMIND_ME_SESSION = 'HAS_REMIND_ME_SESSION';
  private USER = 'USER';
  private userInformation?: BaseResponse<UserInformation> | undefined =
    undefined;

  getUserInformation() {
    if (this.userInformation != null) {
      return this.userInformation;
    } else {
      this.userInformation =
        this.localEncrypted.getValue<BaseResponse<UserInformation>>(
          environment.LOGIN_KEY ?? ''
        ) ?? undefined;
    }
    return this.userInformation;
  }

  isAuthenticate(): boolean {
    return !this.isExpiredToken() && this.hasKeyLogin();
  }

  isExpiredToken(): boolean {
    return this.getMissingExpiredToken() <= 0;
  }

  hasKeyLogin(): boolean {
    return this.localEncrypted.getBoolean(this.HAS_SESSION);
  }

  setUser(user: string) {
    return this.localEncrypted.setValue<string>(this.USER, user);
  }

  getUser() {
    return this.localEncrypted.getValue<string>(this.USER) ?? '';
  }

  getMissingExpiredToken(): number {
    const numberExpired = this.getExpiredToken();
    const now = Math.round(Date.now() / 1000);
    const missingTime = numberExpired - now;
    return missingTime < 0 ? 0 : missingTime;
  }

  getExpiredToken(): number {
    const token = this.getUserInformation()?.token;
    return token ? jwtDecode<JwtPayload>(token).exp ?? 0 : 0;
  }

  createSession(userInformation: BaseResponse<UserInformation>) {
    this.localEncrypted.setValue(environment.LOGIN_KEY ?? '', userInformation);
    this.localEncrypted.setBoolean(this.HAS_SESSION, true);
  }

  deleteSession() {
    localStorage.removeItem(this.HAS_SESSION);
    localStorage.removeItem(this.USER);
    this.localEncrypted.clearToken();
    this.userInformation = undefined;
  }
}
