import { EntityAdapter, createEntityAdapter, IdSelector } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UserRolAppState } from './roles-and-permissions.state';
import {
  rolAndPermissionsAppAction,
  rolAndPermissionsRequestAction,
  rolAndPermissionsResponseAction,
} from './rol-and-permissions.actions';
import { UserRolItem } from '@amad-web-admin/shared';

export const USER_ROL_FEATURE_KEY = 'module-roles-and-permissions';
const selectUserRolId: IdSelector<UserRolItem> = ({ id_rol }) => id_rol;

export const userRolItemEntityAdapter: EntityAdapter<UserRolItem> =
  createEntityAdapter<UserRolItem>({
    selectId: selectUserRolId,
  });

export const userRolInitialState: UserRolAppState = {
  anySuccess: undefined,
  error: undefined,
  loader: false,
  rolesState: userRolItemEntityAdapter.getInitialState(),
};

export const userRolReducer = createReducer(
  userRolInitialState,
  on(rolAndPermissionsResponseAction.successList, (state, items) => ({
    ...state,
    rolesState: userRolItemEntityAdapter.addMany(items.value, state.rolesState),
    error: null,
    loader: false,
  })),
  on(rolAndPermissionsRequestAction.list, (state) => ({
    ...state,
    rolesState: userRolItemEntityAdapter.setAll([], state.rolesState),
    loader: true,
  })),
  on(rolAndPermissionsRequestAction.delete, (state) => ({
    ...state,
    loader: true,
  })),
  on(rolAndPermissionsResponseAction.successDelete, (state, item) => ({
    ...state,
    loader: false,
    rolesState: userRolItemEntityAdapter.removeOne(item.value, state.rolesState),
  })),

  on(rolAndPermissionsRequestAction.add, (state) => ({
    ...state,
    loader: true,
    anySuccess: undefined,
  })),
  on(rolAndPermissionsResponseAction.successAdd, (state, item) => ({
    ...state,
    anySuccess: item.value,
  })),
  on(rolAndPermissionsRequestAction.edit, (state) => ({
    ...state,
    loader: true,
    anySuccess: undefined,
  })),
  on(rolAndPermissionsResponseAction.successEdit, (state, item) => ({
    ...state,
    anySuccess: item.value,
  })),
  on(rolAndPermissionsAppAction.fail, (state, action) => ({
    ...state,
    loader: false,
    selectedUserItem: null,
    error: action.error,
  })),
  on(rolAndPermissionsAppAction.reset, (state) => ({
    ...state,
    userRolInitialState,
    anySuccess: undefined,
  }))
);

export const rolesAndPermissionsFeature = createFeature({
  name: USER_ROL_FEATURE_KEY,
  reducer: userRolReducer,
});
