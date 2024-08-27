import {
  AddOrEditProjectRequest, CompanyItem,
  FilterProjects, ProjectInformationResponse,
  ProjectItem, StatusProject
} from '@amad-web-admin/modules/network';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const projectRequestAction = createActionGroup({
  source: 'module-users-request',
  events: {
    add: props<{ value: AddOrEditProjectRequest }>(),
    changeStatusProject: props<{ idProject:number,status:StatusProject }>(),
    edit: props<{ value: AddOrEditProjectRequest; idProject: number }>(),
    listCompany: props<{ value: FilterProjects }>(),
    listProjects: props<{ value: string }>(),
    delete: props<{ value: StatusProject,idProject: number }>(),
    getInformationProject: props<{ value: ProjectItem }>(),
  },
});

export const projectResponseAction = createActionGroup({
  source: 'module-users-response',
  events: {
    successAdd: props<{ value: AddOrEditProjectRequest }>(),
    successEdit: props<{ value: AddOrEditProjectRequest }>(),
    successDelete: props<{idProject: number }>(),
    successChangeStatusProject: props<{success: boolean,idProject:number,status:StatusProject }>(),
    successListCompany: props<{ value: CompanyItem[] }>(),
    successListProjects: props<{ value: ProjectItem[] }>(),
    successGetInformation: props<{ value: ProjectInformationResponse }>(),
  },
});

export const projectAppAction = createActionGroup({
  source: 'module-users',
  events: {
    fail: props<{ error: any }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
