import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../base-response';
import { Company } from './entities/company';
import { FilterCompany } from './entities/filter-company';
import { CompanyEndpoint } from './company.endpoint';
import { AddCompany } from './entities/add-company';
import { EditUserRol } from '@amad-web-admin/modules/network';

@Injectable({
  providedIn: 'root',
})
export class CompanieService {
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

  edit(addUserRol: EditUserRol, idRol: number): Observable<BaseResponse<any>> {
    return this.http.put<BaseResponse<any>>(
      CompanyEndpoint.PUT_COMPANY + `${idRol}`,
      addUserRol
    );
  }
}
