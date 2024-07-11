import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptedService {
  encrypted(value: string) {
    const key = CryptoJS.enc.Utf8.parse(
      environment.SECRET_KEY,
    );
    const iv = CryptoJS.enc.Utf8.parse(
      environment.SECRET_KEY,
    );
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(value),
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
      },
    );
    return encrypted.toString();
  }
}
