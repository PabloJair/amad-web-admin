import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyAppState } from './company.state';
import { companiesAdapter, COMPANY_FEATURE_KEY } from './company.reducer';

const projectAppState =
  createFeatureSelector<CompanyAppState>(COMPANY_FEATURE_KEY);

const companyAdapterSelector = companiesAdapter.getSelectors();

const companiesState = createSelector(projectAppState, (app) => {
  return app.companies;
});

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
  anySuccess,
  companies,
};
