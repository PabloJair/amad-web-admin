import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout.state';
import { LAYOUT_FEATURE_KEY } from './layout.reducer';

const projectAppState = createFeatureSelector<LayoutState>(LAYOUT_FEATURE_KEY);

const loader = createSelector(projectAppState, (app) => app.loader);
const error = createSelector(projectAppState, (app) => app.error);
const anySuccess = createSelector(projectAppState, (app) => app.anySuccess);

export const layoutSelector = {
  loader,
  error,
  anySuccess,
};
