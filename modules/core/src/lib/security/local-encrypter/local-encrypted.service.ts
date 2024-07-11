import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalEncryptedService {
  constructor( private session: SessionStorageService) {}

  setBoolean(key: string, value: boolean) {
    this.session.set(key, value,);
  }

  getBoolean(key: string) {
    return this.session.get(key) as boolean;
  }
  /**
   * Set JSON in the local storage with Key and encrypted
   * @params {string} : key Name
   * @params {T} key :Name
   * @public
   * @return void
   */
  setValue<T>(key: string, value: T) {
    this.session.set(key, JSON.stringify(value));
  }
  /**
   * Get OBJECT in the local storage with Key and unencrypted
   * @params {string} : key Name
   * @public
   * @return T
   */
  getValue<T>(key: string): T | null {
    return this.hasKey(key)
      ? JSON.parse(this.session.get(key))
      : null;
  }

  /**
   * Clear all keys in the local storage
   * @public
   * @return void
   */
  clearToken() {
    return this.session.clear();
  }
  hasKey(key: string) {
    return this.session.get(key) != null;
  }
}
