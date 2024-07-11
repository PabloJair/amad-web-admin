import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserAppState } from './user.state';
import { USER_FEATURE_KEY, userAdapter, userRolAdapter } from './user.reducer';

const userAppState = createFeatureSelector<UserAppState>(USER_FEATURE_KEY);

const userAdapterSelector = userAdapter.getSelectors();
const userAdapterRolSelector = userRolAdapter.getSelectors();

const userState = createSelector(userAppState, app => {
  return app.userState;
});
const userRolState = createSelector(userAppState, app => {
  return app.userRolesState;
});

const users = createSelector(userState, userAdapterSelector.selectAll);
const userRolesState = createSelector(
  userRolState,
  userAdapterRolSelector.selectAll,
);
const userInformation = createSelector(userState, s1 => {
  return s1.selectedUserItem;
});
const loader = createSelector(userAppState, app => app.loader);
const error = createSelector(userAppState, app => app.error);
const anySuccess = createSelector(userAppState, app => app.anySuccess);

export const userSelector = {
  loader,
  error,
  userInformation,
  users,
  userRolesState,
  anySuccess,
};
