import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '@amad-web-admin/shared';
import { UploadEndpoints } from './upload.endpoints';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  http = inject(HttpClient);

  uploadFile(file: File): Observable<BaseResponse<string>> {
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file);
    return this.http.post<BaseResponse<string>>(UploadEndpoints.upload, formData);
  }
}
