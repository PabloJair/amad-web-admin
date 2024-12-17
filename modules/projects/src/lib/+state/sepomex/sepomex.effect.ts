import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as networkModule from '@amad-web-admin/modules/network';
import {
  sepomexActionRequest,
  sepomexActionResponse,
  sepomexAppAction,
} from './sepomex.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class SepomexEffect {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.SepomexService);

  getStates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sepomexActionRequest.listState),
      switchMap((request) =>
        this.service$.listStates().pipe(
          map((response) =>
            sepomexActionResponse.successListState({
              value: response,
            })
          ),
          catchError((error) => of(sepomexAppAction.fail(error.error)))
        )
      )
    )
  );
  getMunicipality$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sepomexActionRequest.listMunicipality),
      switchMap((request) =>
        this.service$.listMunicipality(request.idState).pipe(
          map((response) =>
            sepomexActionResponse.successListMunicipality({
              value: response,
            })
          ),
          catchError((error) => of(sepomexAppAction.fail(error.error)))
        )
      )
    )
  );

  getNeighborhoods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sepomexActionRequest.listNeighborhoods),
      switchMap((request) =>
        this.service$.listNeighborhood(request.idMunicipality).pipe(
          map((response) =>
            sepomexActionResponse.successListNeighborhoods({
              value: response,
            })
          ),
          catchError((error) => of(sepomexAppAction.fail(error.error)))
        )
      )
    )
  );

  searchForCP$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sepomexActionRequest.searchCP),
      switchMap((request) =>
        this.service$.searchForCP(request.cp).pipe(
          map((response) =>
            sepomexActionResponse.successSearchCP({
              value: response,
            })
          ),
          catchError((error) => of(sepomexAppAction.fail(error.error)))
        )
      )
    )
  );
}
