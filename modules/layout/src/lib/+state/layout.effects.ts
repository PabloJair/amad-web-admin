import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  layoutAppAction,
  layoutRequestAction,
  layoutResponseAction,
} from './layout.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import * as networkModule from '@amad-web-admin/modules/network';

@Injectable()
export class LayoutEffects {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.ProjectsService);

  updateJsonProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(layoutRequestAction.updateJsonProject),
      switchMap((request) =>
        this.service$.putProjectJson(request.value, request.id).pipe(
          map((response) =>
            layoutResponseAction.successUpdateJsonProject({
              value: response.message,
            })
          ),
          catchError((error) => of(layoutAppAction.fail(error.error)))
        )
      )
    )
  );
}
