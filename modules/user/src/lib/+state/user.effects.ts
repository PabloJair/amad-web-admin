import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  userAppAction,
  userRequestAction,
  userResponseAction,
} from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import * as networkModule from '@amad-web-admin/modules/network';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.UserService);
  requestListUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestAction.list),
      switchMap((request) =>
        this.service$.list(request.value).pipe(
          map((response) =>
            userResponseAction.successList({
              value: response.data,
            })
          ),
          catchError((error) => of(userAppAction.fail(error.error)))
        )
      )
    )
  );
  requestUserInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestAction.getInformation),
      switchMap((request) =>
        this.service$.getInformationUser(request.value).pipe(
          map((response) =>
            userResponseAction.successGetInformation({
              value: response.data,
            })
          ),
          catchError((error) => of(userAppAction.fail(error.error)))
        )
      )
    )
  );

  requestAddUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestAction.add),
      switchMap((request) => {
        return this.service$.add(request.value).pipe(
          map(() =>
            userResponseAction.successAdd({
              value: request.value,
            })
          ),
          catchError((error) => of(userAppAction.fail(error)))
        );
      })
    )
  );

  requestEditUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestAction.edit),
      switchMap((request) => {
        return this.service$.edit(request.value, request.idUser).pipe(
          map(() =>
            userResponseAction.successEdit({
              value: request.value,
            })
          ),
          catchError((error) => of(userAppAction.fail(error)))
        );
      })
    )
  );

  requestDeleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestAction.delete),
      switchMap((request) => {
        return this.service$.delete(request.value).pipe(
          map(() =>
            userResponseAction.successDelete({
              value: request.value,
            })
          ),
          catchError((error) => of(userAppAction.fail(error.error)))
        );
      })
    )
  );

  listRol$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRequestAction.listRoles),
      switchMap((request) => {
        return this.service$.listRol(request.value).pipe(
          map((response) =>
            userResponseAction.successListRoles({
              value: response.data,
            })
          ),
          catchError((error) => of(userAppAction.fail(error.error)))
        );
      })
    )
  );
}
