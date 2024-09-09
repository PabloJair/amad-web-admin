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
}
