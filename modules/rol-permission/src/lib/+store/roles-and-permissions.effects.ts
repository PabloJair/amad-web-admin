import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as networkModule from '@amad-web-admin/modules/network';
import {
  rolAndPermissionsAppAction,
  rolAndPermissionsRequestAction,
  rolAndPermissionsResponseAction,
} from './rol-and-permissions.actions';

@Injectable()
export class RolesAndPermissionsEffects {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.PermissionAndRolesService);
  requestListRolesUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rolAndPermissionsRequestAction.list),
      switchMap(request =>
        this.service$.listRol(request.value).pipe(
          map(response =>
            rolAndPermissionsResponseAction.successList({
              value: response.data,
            }),
          ),
          catchError(error => of(rolAndPermissionsAppAction.fail(error.error))),
        ),
      ),
    ),
  );

  requestAddRolesUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rolAndPermissionsRequestAction.add),
      switchMap(request => {
        return this.service$.addRol(request.value).pipe(
          map(() =>
            rolAndPermissionsResponseAction.successAdd({
              value: request.value,
            }),
          ),
          catchError(error => of(rolAndPermissionsAppAction.fail(error))),
        );
      }),
    ),
  );

  requestEditRolUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rolAndPermissionsRequestAction.edit),
      switchMap(request => {
        return this.service$.editRol(request.value, request.idUser).pipe(
          map(() =>
            rolAndPermissionsResponseAction.successEdit({
              value: request.value,
            }),
          ),
          catchError(error => of(rolAndPermissionsAppAction.fail(error))),
        );
      }),
    ),
  );

  requestDeleteRolUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rolAndPermissionsRequestAction.delete),
      switchMap(request => {
        return this.service$.deleteRol(request.value).pipe(
          map(() =>
            rolAndPermissionsResponseAction.successDelete({
              value: request.value,
            }),
          ),
          catchError(error => of(rolAndPermissionsAppAction.fail(error.error))),
        );
      }),
    ),
  );
}
