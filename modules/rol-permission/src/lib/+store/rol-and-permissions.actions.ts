import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddUserRol, EditUserRol, FilterRoles, UserRolItem } from '@amad-web-admin/shared';

export const rolAndPermissionsRequestAction = createActionGroup({
  source: 'module-rol-and-permissions-request',
  events: {
    add: props<{ value: AddUserRol }>(),
    edit: props<{ value: EditUserRol; idUser: number }>(),
    list: props<{ value: FilterRoles }>(),
    delete: props<{ value: number }>(),
  },
});

export const rolAndPermissionsResponseAction = createActionGroup({
  source: 'module-rol-and-permissions-response',
  events: {
    successAdd: props<{ value: AddUserRol }>(),
    successEdit: props<{ value: EditUserRol }>(),
    successList: props<{ value: UserRolItem[] }>(),
    successDelete: props<{ value: number }>(),
  },
});

export const rolAndPermissionsAppAction = createActionGroup({
  source: 'module-rol-and-permissions',
  events: {
    fail: props<{ error: any }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
