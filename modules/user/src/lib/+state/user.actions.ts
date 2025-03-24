import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  FilterRoles,
  FilterUser,
  ModuleUserInformation,
  UserAdd,
  UserEdit,
  UserItem,
  UserRolItem,
} from '@amad-web-admin/shared';

export const userRequestAction = createActionGroup({
  source: 'module-users-request',
  events: {
    add: props<{ value: UserAdd }>(),
    edit: props<{ value: UserEdit; idUser: number }>(),
    list: props<{ value: FilterUser }>(),
    delete: props<{ value: UserItem }>(),
    getInformation: props<{ value: UserItem }>(),
    listRoles: props<{ value: FilterRoles }>(),
  },
});

export const userResponseAction = createActionGroup({
  source: 'module-users-response',
  events: {
    successAdd: props<{ value: UserAdd }>(),
    successEdit: props<{ value: UserEdit }>(),
    successList: props<{ value: UserItem[] }>(),
    successDelete: props<{ value: UserItem }>(),
    successGetInformation: props<{ value: ModuleUserInformation }>(),
    successListRoles: props<{ value: UserRolItem[] }>(),
  },
});

export const userAppAction = createActionGroup({
  source: 'module-users',
  events: {
    fail: props<{ error: any }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
