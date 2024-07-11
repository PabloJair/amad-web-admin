import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { logout } from './application.actions';

@Injectable()
export class ApplicationFacade {
  private readonly store = inject(Store);

  logout() {
    this.store.dispatch(logout());
  }
}
