import { Route } from '@angular/router';
import { ModulesCompaniesComponent } from './modules-companies/modules-companies.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromProjectRedux from '../../../companies/src/lib/+state/company.reducer';
import { CompanyFacade } from './+state/company.facade';
import { CompanyEffects } from './+state/company.effects';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { CompaniesNavigationService } from './commons/companies-navigation.service';

export const modulesCompaniesRoutes: Route[] = [
  {
    path: '',
    component: ModulesCompaniesComponent,

    children: [
      {
        path: '',
        component: CompanyListComponent,
      },
      {
        path: NavigationRoutes.company.COMPANY_ADD,
        component: CompanyAddComponent,
      },
      {
        path: NavigationRoutes.company.COMPANY_EDIT,
        component: CompanyEditComponent,
      },
    ],
    providers: [
      CompanyFacade,
      CompaniesNavigationService,
      provideEffects([CompanyEffects]),
      provideState(fromProjectRedux.companyReducer),
    ],
  },
];
