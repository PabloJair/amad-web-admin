import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCode } from '@amad-web-admin/modules/network';

@Injectable({
  providedIn: 'root',
})
export class QrGeneratorService {
  http = inject(HttpClient);

  headers = {
    'x-rapidapi-key': 'f63e0733d7mshd48a5c22400dba7p1a34f0jsnc1a20be59013',
    'x-rapidapi-host': 'qrcode-monkey.p.rapidapi.com',
  };

  generateQR(data: string, logo: string) {
    const qrCode: QRCode = {
      data: data,
      config: {
        body: 'dot',
        eye: 'frame2',
        eyeBall: 'ball0',
        logo: logo,
      },
      size: 300,
      download: false,
      file: 'png',
    };

    return this.http.post('qr/custom', qrCode, {
      headers: this.headers,
      responseType: 'blob',
    });
  }
}
