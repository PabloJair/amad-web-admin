import { EntityAdapter, createEntityAdapter, IdSelector } from '@ngrx/entity';
import { CompanyAppState } from './company.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CompanyItem, ProjectItem } from '@amad-web-admin/modules/network';
import {
  companyAppAction,
  companyRequestAction,
  companyResponseAction,
} from './company.actions';

export const COMPANY_FEATURE_KEY = 'module-company';
const selectCompanyId: IdSelector<CompanyItem> = ({ id_cia }) => id_cia;

export const companiesAdapter: EntityAdapter<CompanyItem> =
  createEntityAdapter<CompanyItem>({
    selectId: selectCompanyId,
  });

export const companyInitialState: CompanyAppState = {
  company: undefined,
  companies: companiesAdapter.getInitialState(),
  anySuccess: undefined,
  error: undefined,
  loader: false,
};

export const companyAppReducer = createReducer(
  companyInitialState,

  on(companyRequestAction.listCompany, (state) => ({
    ...state,
    companies: companiesAdapter.setAll([], state.companies),
    loader: true,
  })),
  on(companyResponseAction.successListCompany, (state, items) => ({
    ...state,
    companies: companiesAdapter.addMany(items.value, state.companies),
    error: null,
    loader: false,
  })),
  on(companyAppAction.reset, (state) => ({
    ...state,
    companyInitialState,
  }))
);

export const companyReducer = createFeature({
  name: COMPANY_FEATURE_KEY,
  reducer: companyAppReducer,
});
