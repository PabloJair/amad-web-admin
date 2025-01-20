import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCode } from '@amad-web-admin/modules/network';

@Injectable({
  providedIn: 'root',
})
export class QrGeneratorService {
  http = inject(HttpClient);

  headers = {
    'aki-key-qr': 'f63e0733d7mshd48a5c22400dba7p1a34f0jsnc1a20be59013',
  };

  generateQR(data: string, logo: string) {
    return this.http.get(`?data=${data}&logo=${logo}`, {
      headers: {
        'aki-key-qr': 'f63e0733d7mshd48a5c22400dba7p1a34f0jsnc1a20be59013',
      },
      responseType: 'blob',
    });
  }
}
