import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AddOrEditProject,
  CompanyItem,
  CreateJsonProject,
  FilterProjects,
  LanguagesProject,
  ProjectInformation,
  ProjectItem,
  StatusProject,
  UpdateJsonProjectLayout,
} from '@amad-web-admin/shared';

export const projectRequestAction = createActionGroup({
  source: 'module-users-request',
  events: {
    add: props<{ value: AddOrEditProject }>(),
    changeStatusProject: props<{ idProject: number; status: StatusProject }>(),
    edit: props<{ value: AddOrEditProject; idProject: number }>(),
    listCompany: props<{ value: FilterProjects }>(),
    listProjects: props<{ value: string }>(),
    delete: props<{ value: StatusProject; idProject: number }>(),
    getInformationProject: props<{ value: ProjectItem }>(),
    getLanguages: emptyProps(),
    createJsonProject: props<{ value: CreateJsonProject }>(),
    updateJsonProject: props<{ value: UpdateJsonProjectLayout; id: string }>(),
  },
});

export const projectResponseAction = createActionGroup({
  source: 'module-users-response',
  events: {
    successAdd: props<{ value: AddOrEditProject }>(),
    successEdit: props<{ value: AddOrEditProject }>(),
    successDelete: props<{ idProject: number }>(),
    successChangeStatusProject: props<{
      success: boolean;
      idProject: number;
      status: StatusProject;
    }>(),
    successListCompany: props<{ value: CompanyItem[] }>(),
    successListProjects: props<{ value: ProjectItem[] }>(),
    successGetInformation: props<{ value: ProjectInformation }>(),
    successLanguages: props<{ value: LanguagesProject[] }>(),
    successCreateJsonProject: props<{ value: number }>(),
    successUpdateJsonProject: props<{ value: string }>(),
  },
});

export const projectAppAction = createActionGroup({
  source: 'module-users',
  events: {
    fail: props<{ error: unknown }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
