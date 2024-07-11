import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRolAppState } from './roles-and-permissions.state';
import {
  USER_ROL_FEATURE_KEY,
  userRolItemEntityAdapter,
} from './roles-and-permissions.reducer';

const userRolAppState =
  createFeatureSelector<UserRolAppState>(USER_ROL_FEATURE_KEY);

const rolUserAdapterSelector = userRolItemEntityAdapter.getSelectors();

const userRolState = createSelector(userRolAppState, app => {
  return app.rolesState;
});

const userRolesState = createSelector(
  userRolState,
  rolUserAdapterSelector.selectAll,
);

const loader = createSelector(userRolAppState, app => app.loader);
const error = createSelector(userRolAppState, app => app.error);
const anySuccess = createSelector(userRolAppState, app => app.anySuccess);

export const rolesAndPermissionsSelector = {
  loader,
  error,
  userRolesState,
  anySuccess,
};
