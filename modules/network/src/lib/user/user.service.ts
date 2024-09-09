import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserItem } from './entities/user-item';
import { FilterUser } from './entities/filter-user';
import { Observable } from 'rxjs';
import { BaseResponse } from '../base-response';
import { UserAdd } from './entities/user-add';
import { UserEdit } from './entities/user-edit';
import { ModuleUserInformation } from './entities/module-user-information';
import { EndPointUser } from './end-points.user';
import { FilterRoles } from '../rol/entities/filter-roles';
import { UserRolItem } from '../rol/entities/user-rol-item';
import { PermissionAndRolesEndPoints } from '../rol/permission-and-roles.end-points';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  list(filter: FilterUser): Observable<BaseResponse<UserItem[]>> {
    return this.http.post<BaseResponse<UserItem[]>>(
      EndPointUser.POST_LIST_USERS,
      filter
    );
  }

  add(value: UserAdd): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(
      EndPointUser.POST_SAVE_USERS,
      value
    );
  }

  delete(user: UserItem): Observable<BaseResponse<any>> {
    const url = EndPointUser.DISABLE_USERS.replace(
      '{id}',
      user.id_usuario.toString()
    );
    return this.http.delete<BaseResponse<any>>(url);
  }

  edit(value: UserEdit, idUser: number): Observable<BaseResponse<any>> {
    const url = EndPointUser.EDIT_USER.replace('{id}', idUser.toString());
    return this.http.put<BaseResponse<any>>(url, value);
  }

  getInformationUser(
    value: UserItem
  ): Observable<BaseResponse<ModuleUserInformation>> {
    const url = EndPointUser.GET_USER_INFORMATION.replace(
      '{id_information}',
      value.id_usuario.toString()
    );

    return this.http.get<BaseResponse<ModuleUserInformation>>(url);
  }

  listRol(filter: FilterRoles): Observable<BaseResponse<UserRolItem[]>> {
    return this.http.post<BaseResponse<UserRolItem[]>>(
      PermissionAndRolesEndPoints.GET_LIST_ROL,
      filter
    );
  }
}
