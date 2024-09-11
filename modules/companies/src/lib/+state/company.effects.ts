import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  companyAppAction,
  companyRequestAction,
  companyResponseAction,
} from './company.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import * as networkModule from '@amad-web-admin/modules/network';

@Injectable()
export class CompanyEffects {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.ProjectsService);
  private company$ = inject(networkModule.CompaniesService);
  requestListCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyRequestAction.listCompany),
      switchMap((request) =>
        this.service$.listCompany(request.value).pipe(
          map((response) =>
            companyResponseAction.successListCompany({
              value: response.data,
            })
          ),
          catchError((error) => of(companyAppAction.fail(error.error)))
        )
      )
    )
  );

  addCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyRequestAction.add),
      switchMap((request) =>
        this.company$.add(request.value).pipe(
          map((response) =>
            companyResponseAction.successAdd({
              value: response.data,
            })
          ),
          catchError((error) => of(companyAppAction.fail(error.error)))
        )
      )
    )
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyRequestAction.delete),
      switchMap((request) =>
        this.company$.delete(request.idCompany).pipe(
          map((response) =>
            companyResponseAction.successDelete({
              value: response.data,
            })
          ),
          catchError((error) => of(companyAppAction.fail(error.error)))
        )
      )
    )
  );
  editCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(companyRequestAction.edit),
      switchMap((request) =>
        this.company$.edit(request.value, request.id).pipe(
          map((response) =>
            companyResponseAction.successEdit({
              value: response.data,
            })
          ),
          catchError((error) => of(companyAppAction.fail(error.error)))
        )
      )
    )
  );
}
