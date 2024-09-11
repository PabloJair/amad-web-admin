import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../base-response';
import { Company } from './entities/company';
import { FilterCompany } from './entities/filter-company';
import { CompanyEndpoint } from './company.endpoint';
import { AddCompany } from './entities/add-company';
import { EditCompany, EditUserRol } from '@amad-web-admin/modules/network';
import { CompanyStatus } from './entities/company-status';
import { EndPointUser } from '../user/end-points.user';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  list(filter: FilterCompany): Observable<BaseResponse<Company[]>> {
    return this.http.post<BaseResponse<Company[]>>(
      CompanyEndpoint.POST_LIST,
      filter
    );
  }

  add(addUserRol: AddCompany): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<null>>(
      CompanyEndpoint.POST_ADD,
      addUserRol
    );
  }

  edit(addUserRol: EditCompany, idRol: number): Observable<BaseResponse<any>> {
    return this.http.put<BaseResponse<any>>(
      CompanyEndpoint.PUT_COMPANY + `${idRol}`,
      addUserRol
    );
  }

  delete(idCompany: number): Observable<BaseResponse<any>> {
    const options = {
      body: {
        // Contenido del cuerpo que deseas enviar
        ids: [idCompany],
      },
    };
    return this.http.delete<BaseResponse<any>>(
      CompanyEndpoint.DELETE_COMPANY,
      options
    );
  }
}
