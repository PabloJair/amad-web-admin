import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SepomexState } from './sepomex.state';
import { SEPOMEX_REDUCER_KEY } from './sepomex.reducer';

const sepomexAppState =
  createFeatureSelector<SepomexState>(SEPOMEX_REDUCER_KEY);

const states = createSelector(sepomexAppState, (app) => {
  return app.states;
});

const municipality = createSelector(sepomexAppState, (app) => {
  return app.municipality;
});

const neighborhoods = createSelector(sepomexAppState, (app) => {
  return app.neighborhoods;
});
const searchCP = createSelector(sepomexAppState, (app) => {
  return app.searchCP;
});
const loader = createSelector(sepomexAppState, (app) => app.loader);
const error = createSelector(sepomexAppState, (app) => app.error);

export const sepomexSelector = {
  loader,
  error,
  neighborhoods,
  municipality,
  searchCP,
  states,
};
