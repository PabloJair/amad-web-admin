import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { projectsSelector } from './company.selector';
import { skip } from 'rxjs';
import { companyAppAction, companyRequestAction } from './company.actions';
import { FilterProjects } from '@amad-web-admin/modules/network';

@Injectable()
export class CompanyFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(projectsSelector.loader), skip(1));

  listCompanies$ = this.store.pipe(select(projectsSelector.companies));
  successAddCompany = this.store.pipe(
    select(projectsSelector.anySuccess),
    skip(1)
  );
  error$ = this.store.pipe(select(projectsSelector.error), skip(1));

  public getListCompanies(filter: FilterProjects) {
    this.store.dispatch(companyRequestAction.listCompany({ value: filter }));
  }

  public reset() {
    this.store.dispatch(companyAppAction.reset());
  }
}
