import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddCompany, CompanyItem, EditCompany, FilterProjects } from '@amad-web-admin/shared';

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
    successAdd: props<{ value: string }>(),
    successEdit: props<{ value: string }>(),
    successDelete: props<{ value: string }>(),
  },
});

export const companyAppAction = createActionGroup({
  source: 'module-company',
  events: {
    fail: props<{ error: unknown }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
