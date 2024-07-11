import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { filter, skip } from 'rxjs';
import { rolesAndPermissionsSelector } from './roles-and-permissions.selector';
import {
  rolAndPermissionsAppAction,
  rolAndPermissionsRequestAction,
} from './rol-and-permissions.actions';
import {
  AddUserRol,
  EditUserRol,
  FilterRoles,
} from '@amad-web-admin/modules/network';

@Injectable()
export class RolesAndPermissionFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(
    select(rolesAndPermissionsSelector.loader),
    skip(1),
  );
  listRol$ = this.store.pipe(
    select(rolesAndPermissionsSelector.userRolesState),
  );
  error$ = this.store.pipe(select(rolesAndPermissionsSelector.error), skip(1));
  successUser$ = this.store.pipe(
    select(rolesAndPermissionsSelector.anySuccess),
    filter(filter => filter != null),
  );

  public getListRolesUsers(filter: FilterRoles) {
    this.store.dispatch(rolAndPermissionsRequestAction.list({ value: filter }));
  }

  public addUser(value: AddUserRol) {
    this.store.dispatch(rolAndPermissionsRequestAction.add({ value }));
  }

  public editUser(value: EditUserRol, idUser: number) {
    this.store.dispatch(rolAndPermissionsRequestAction.edit({ value, idUser }));
  }

  public deleteRol(value: number) {
    this.store.dispatch(rolAndPermissionsRequestAction.delete({ value }));
  }

  public reset() {
    this.store.dispatch(rolAndPermissionsAppAction.reset());
  }
}
