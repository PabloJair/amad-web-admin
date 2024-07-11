import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { userSelector } from './user.selector';
import { filter, skip } from 'rxjs';
import {
  FilterRoles,
  FilterUser,
  UserAdd,
  UserEdit,
  UserItem,
} from '@amad-web-admin/modules/network';
import { userAppAction, userRequestAction } from './user.actions';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(userSelector.loader), skip(1));
  listUser$ = this.store.pipe(select(userSelector.users));
  listRol$ = this.store.pipe(select(userSelector.userRolesState));
  error$ = this.store.pipe(select(userSelector.error), skip(1));
  successAddUser$ = this.store.pipe(
    select(userSelector.anySuccess),
    filter(filter => filter != null),
  );
  userInformation$ = this.store.pipe(
    select(userSelector.userInformation),
    filter(filter => filter != null),
  );
  public getListUsers(filter: FilterUser) {
    this.store.dispatch(userRequestAction.list({ value: filter }));
  }

  public addUser(value: UserAdd) {
    this.store.dispatch(userRequestAction.add({ value }));
  }

  public editUser(value: UserEdit, idUser: number) {
    this.store.dispatch(userRequestAction.edit({ value, idUser }));
  }
  public userInformation(value: UserItem) {
    this.store.dispatch(userRequestAction.getInformation({ value }));
  }

  public deleteUser(value: UserItem) {
    this.store.dispatch(userRequestAction.delete({ value }));
  }

  public getListRol(value: FilterRoles) {
    this.store.dispatch(userRequestAction.listRoles({ value }));
  }

  public reset() {
    this.store.dispatch(userAppAction.reset());
  }
}
