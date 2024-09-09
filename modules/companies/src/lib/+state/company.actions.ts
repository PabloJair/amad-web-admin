import {
  AddOrEditProjectRequest,
  CompanyItem,
  FilterProjects,
  ProjectInformationResponse,
  ProjectItem,
  StatusProject,
} from '@amad-web-admin/modules/network';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const companyRequestAction = createActionGroup({
  source: 'module-company-request',
  events: {
    add: props<{ value: AddOrEditProjectRequest }>(),
    listCompany: props<{ value: FilterProjects }>(),
    delete: props<{ value: StatusProject; idProject: number }>(),
  },
});

export const companyResponseAction = createActionGroup({
  source: 'module-company-response',
  events: {
    successListCompany: props<{ value: CompanyItem[] }>(),
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
