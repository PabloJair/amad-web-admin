import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { skip } from 'rxjs';
import { layoutSelector } from './layout.selector';
import { layoutAppAction, layoutRequestAction } from './layout.actions';
import { UpdateJsonProjectLayout } from '@amad-web-admin/shared';

@Injectable()
export class LayoutFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(layoutSelector.loader), skip(1));
  anySuccess = this.store.pipe(select(layoutSelector.anySuccess), skip(1));
  error$ = this.store.pipe(select(layoutSelector.error), skip(1));

  public UpdateJsonProject(value: UpdateJsonProjectLayout, id: number) {
    this.store.dispatch(layoutRequestAction.updateJsonProject({ value, id: id.toString() }));
  }

  public reset() {
    this.store.dispatch(layoutAppAction.reset());
  }
}
