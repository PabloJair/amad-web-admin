import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BaseResponse,
  FilterRoles,
  UserRolItem,
  AddUserRol,
  EditUserRol,
} from '@amad-web-admin/shared';

import { PermissionAndRolesEndPoints } from './permission-and-roles.end-points';

@Injectable({
  providedIn: 'root',
})
export class PermissionAndRolesService {
  constructor(private http: HttpClient) {}

  listRol(filter: FilterRoles): Observable<BaseResponse<UserRolItem[]>> {
    return this.http.post<BaseResponse<UserRolItem[]>>(
      PermissionAndRolesEndPoints.GET_LIST_ROL,
      filter
    );
  }

  addRol(addUserRol: AddUserRol): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<null>>(PermissionAndRolesEndPoints.POST_ADD_ROL, addUserRol);
  }

  editRol(addUserRol: EditUserRol, idRol: number): Observable<BaseResponse<any>> {
    return this.http.put<BaseResponse<any>>(
      PermissionAndRolesEndPoints.PUT_ROL + `${idRol}`,
      addUserRol
    );
  }

  deleteRol(idRol: number): Observable<BaseResponse<any>> {
    return this.http.delete<BaseResponse<any>>(PermissionAndRolesEndPoints.DELETE_ROL + `${idRol}`);
  }
}
