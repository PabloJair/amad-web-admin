import { EntityAdapter, createEntityAdapter, IdSelector } from '@ngrx/entity';
import { ProjectAppState } from './projects.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { projectAppAction, projectRequestAction, projectResponseAction } from './projects.actions';
import { CompanyItem, ProjectItem } from '@amad-web-admin/shared';

export const PROJECT_FEATURE_KEY = 'module-project';
const selectProjectId: IdSelector<ProjectItem> = ({ id_application }) => id_application;
const selectCompanyId: IdSelector<CompanyItem> = ({ id_cia }) => id_cia;

export const projectAdapter: EntityAdapter<ProjectItem> = createEntityAdapter<ProjectItem>({
  selectId: selectProjectId,
});
export const companiesAdapter: EntityAdapter<CompanyItem> = createEntityAdapter<CompanyItem>({
  selectId: selectCompanyId,
});

export const projectInitialState: ProjectAppState = {
  languages: [],
  company: undefined,
  companies: companiesAdapter.getInitialState(),
  projectInformation: undefined,
  anySuccess: undefined,
  error: undefined,
  loader: false,
  projects: projectAdapter.getInitialState(),
};

export const projectsReducer = createReducer(
  projectInitialState,
  on(projectResponseAction.successListProjects, (state, items) => ({
    ...state,
    projects: projectAdapter.addMany(items.value, state.projects),
    error: null,
    loader: false,
  })),
  on(projectRequestAction.listProjects, (state) => ({
    ...state,
    projects: projectAdapter.setAll([], state.projects),
    loader: true,
  })),

  on(projectRequestAction.listCompany, (state) => ({
    ...state,
    companies: companiesAdapter.setAll([], state.companies),
    loader: true,
  })),
  on(projectResponseAction.successListCompany, (state, items) => ({
    ...state,
    companies: companiesAdapter.addMany(items.value, state.companies),
    error: null,
    loader: false,
  })),

  on(projectResponseAction.successListCompany, (state, items) => ({
    ...state,
    companies: companiesAdapter.addMany(items.value, state.companies),
    error: null,
    loader: false,
  })),
  on(projectRequestAction.getInformationProject, (state) => ({
    ...state,
    loader: true,
    projectInformation: undefined,
    projects: {
      ...state.projects,
      selectedUserItem: null,
    },
  })),
  on(projectRequestAction.changeStatusProject, (state) => ({
    ...state,
    loader: true,
  })),
  on(projectResponseAction.successChangeStatusProject, (state, value) => ({
    ...state,
    loader: false,
    projects: projectAdapter.updateOne(
      {
        id: value.idProject.toString(),
        changes: {
          status: value.status.status,
        },
      },
      { ...state.projects }
    ),
  })),
  on(projectResponseAction.successGetInformation, (state, item) => ({
    ...state,
    loader: false,
    projectInformation: item.value,
    projects: {
      ...state.projects,
      selectedUserItem: item.value,
    },
  })),

  on(projectRequestAction.delete, (state) => ({
    ...state,
    loader: true,
  })),
  on(projectResponseAction.successDelete, (state, item) => ({
    ...state,
    loader: false,
    userState: projectAdapter.removeOne(item.idProject, state.projects),
  })),
  on(projectRequestAction.add, (state) => ({
    ...state,
    loader: true,
    anySuccess: undefined,
  })),
  on(projectResponseAction.successAdd, (state, item) => ({
    ...state,
    anySuccess: item.value,
  })),

  on(projectRequestAction.edit, (state) => ({
    ...state,
    loader: true,
    anySuccess: undefined,
  })),
  on(projectResponseAction.successEdit, (state, item) => ({
    ...state,
    anySuccess: item.value,
    loader: false,
  })),
  on(projectAppAction.fail, (state, action) => ({
    ...state,
    loader: false,
    selectedUserItem: null,
    error: action.error,
  })),

  on(projectAppAction.reset, (state) => ({
    ...state,
    projectInitialState,
  })),
  on(projectRequestAction.getLanguages, (state) => ({
    ...state,
    languages: [],
    error: null,
    loader: true,
  })),
  on(projectResponseAction.successLanguages, (state, items) => ({
    ...state,
    languages: items.value,
    error: null,
    loader: false,
  })),
  on(projectRequestAction.createJsonProject, (state) => ({
    ...state,
    anySuccess: undefined,
    error: null,
    loader: true,
  })),
  on(projectResponseAction.successCreateJsonProject, (state, items) => ({
    ...state,
    anySuccess: items.value,
    error: null,
    loader: false,
  })),
  on(projectRequestAction.updateJsonProject, (state) => ({
    ...state,
    anySuccess: undefined,
    error: null,
    loader: true,
  })),
  on(projectResponseAction.successUpdateJsonProject, (state, items) => ({
    ...state,
    anySuccess: items.value,
    error: null,
    loader: false,
  }))
);

export const projectFeature = createFeature({
  name: PROJECT_FEATURE_KEY,
  reducer: projectsReducer,
});
