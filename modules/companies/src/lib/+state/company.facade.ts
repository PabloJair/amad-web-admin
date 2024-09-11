import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { projectsSelector } from './company.selector';
import { skip } from 'rxjs';
import { companyAppAction, companyRequestAction } from './company.actions';
import {
  EditCompany,
  FilterProjects,
  StatusProject,
} from '@amad-web-admin/modules/network';
import { AddCompany } from '@amad-web-admin/modules/network';
import { CompanyStatus } from '../../../../network/src/lib/companies/entities/company-status';

@Injectable()
export class CompanyFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(projectsSelector.loader), skip(1));

  listCompanies$ = this.store.pipe(select(projectsSelector.companies));
  success$ = this.store.pipe(select(projectsSelector.anySuccess), skip(1));
  error$ = this.store.pipe(select(projectsSelector.error), skip(1));

  public getListCompanies(filter: FilterProjects) {
    this.store.dispatch(companyRequestAction.listCompany({ value: filter }));
  }

  public addCompany(value: AddCompany) {
    this.store.dispatch(companyRequestAction.add({ value }));
  }

  public editCompany(value: EditCompany, id: number) {
    this.store.dispatch(companyRequestAction.edit({ value: value, id: id }));
  }

  public delete(id: number) {
    this.store.dispatch(companyRequestAction.delete({ idCompany: id }));
  }

  public reset() {
    this.store.dispatch(companyAppAction.reset());
  }
}
