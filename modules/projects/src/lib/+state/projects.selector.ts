import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectAppState } from './projects.state';
import {
  companiesAdapter,
  PROJECT_FEATURE_KEY,
  projectAdapter,
} from './projects.reducer';

const projectAppState =
  createFeatureSelector<ProjectAppState>(PROJECT_FEATURE_KEY);

const projectAdapterSelector = projectAdapter.getSelectors();
const companyAdapterSelector = companiesAdapter.getSelectors();

const projectState = createSelector(projectAppState, (app) => {
  return app.projects;
});

const companiesState = createSelector(projectAppState, (app) => {
  return app.companies;
});
const languages = createSelector(projectAppState, (app) => {
  return app.languages;
});
const projectInformation = createSelector(projectAppState, (s1) => {
  return s1.projectInformation;
});
const projects = createSelector(projectState, projectAdapterSelector.selectAll);
const companies = createSelector(
  companiesState,
  companyAdapterSelector.selectAll
);

const loader = createSelector(projectAppState, (app) => app.loader);
const error = createSelector(projectAppState, (app) => app.error);
const anySuccess = createSelector(projectAppState, (app) => app.anySuccess);

export const projectsSelector = {
  loader,
  error,
  projectInformation,
  projects,
  anySuccess,
  companies,
  languages,
};
