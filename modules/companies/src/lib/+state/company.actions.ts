import {
  CompanyItem,
  EditCompany,
  FilterProjects,
  StatusProject,
} from '@amad-web-admin/modules/network';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddCompany } from '@amad-web-admin/modules/network';
import { CompanyStatus } from '../../../../network/src/lib/companies/entities/company-status';

export const companyRequestAction = createActionGroup({
  source: 'module-company-request',
  events: {
    add: props<{ value: AddCompany }>(),
    edit: props<{ value: EditCompany; id: number }>(),
    listCompany: props<{ value: FilterProjects }>(),
    delete: props<{ idCompany: number }>(),
  },
});

export const companyResponseAction = createActionGroup({
  source: 'module-company-response',
  events: {
    successListCompany: props<{ value: CompanyItem[] }>(),
    successAdd: props<{ value: String }>(),
    successEdit: props<{ value: String }>(),
    successDelete: props<{ value: String }>(),
  },
});

export const companyAppAction = createActionGroup({
  source: 'module-company',
  events: {
    fail: props<{ error: any }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
