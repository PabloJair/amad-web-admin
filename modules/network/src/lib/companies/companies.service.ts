import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyEndpoint } from './company.endpoint';
import {
  AddCompany,
  FilterCompany,
  Company,
  EditCompany,
  BaseResponse,
} from '@amad-web-admin/shared';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  list(filter: FilterCompany): Observable<BaseResponse<Company[]>> {
    return this.http.post<BaseResponse<Company[]>>(CompanyEndpoint.POST_LIST, filter);
  }

  add(addUserRol: AddCompany): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(CompanyEndpoint.POST_ADD, addUserRol);
  }

  edit(addUserRol: EditCompany, idRol: number): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(
      CompanyEndpoint.PUT_COMPANY + `${idRol}`,
      addUserRol
    );
  }

  delete(idCompany: number): Observable<BaseResponse<string>> {
    const options = {
      body: {
        // Contenido del cuerpo que deseas enviar
        ids: [idCompany],
      },
    };
    return this.http.delete<BaseResponse<any>>(CompanyEndpoint.DELETE_COMPANY, options);
  }
}
