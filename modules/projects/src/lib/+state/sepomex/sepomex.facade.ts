import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, skip } from 'rxjs';
import { sepomexSelector } from './sepomex.selector';
import { sepomexActionRequest, sepomexAppAction } from './sepomex.action';

@Injectable()
export class SepomexFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(sepomexSelector.loader), skip(1));
  listStates$ = this.store.pipe(select(sepomexSelector.states));
  listMunicipality$ = this.store.pipe(select(sepomexSelector.municipality));
  listNeighborhoods$ = this.store.pipe(select(sepomexSelector.neighborhoods));
  searchCP$ = this.store.pipe(
    select(sepomexSelector.searchCP),
    skip(1),
    filter((data) => data !== undefined)
  );
  error$ = this.store.pipe(select(sepomexSelector.error), skip(1));

  public getListStates() {
    this.store.dispatch(sepomexActionRequest.listState());
  }

  public searchCP(cp: string) {
    this.store.dispatch(sepomexActionRequest.searchCP({ cp }));
  }

  public getListMunicipality(idState: number) {
    this.store.dispatch(sepomexActionRequest.listMunicipality({ idState }));
  }

  public getListNeighborhoods(idMunicipality: number) {
    this.store.dispatch(sepomexActionRequest.listNeighborhoods({ idMunicipality }));
  }

  public reset() {
    this.store.dispatch(sepomexAppAction.reset());
  }
}
