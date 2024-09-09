import { Route } from '@angular/router';
import { ModulesCompaniesComponent } from './modules-companies/modules-companies.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromProjectRedux from '../../../companies/src/lib/+state/company.reducer';
import { CompanyFacade } from './+state/company.facade';
import { CompanyEffects } from './+state/company.effects';
import { companyReducer } from '../../../companies/src/lib/+state/company.reducer';

export const modulesCompaniesRoutes: Route[] = [
  {
    path: '',
    component: ModulesCompaniesComponent,

    children: [
      {
        path: '',
        component: CompanyListComponent,
      },
    ],
    providers: [
      CompanyFacade,
      provideEffects([CompanyEffects]),
      provideState(fromProjectRedux.companyReducer),
    ],
  },
];
