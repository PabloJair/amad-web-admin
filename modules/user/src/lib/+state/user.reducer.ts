import { EntityAdapter, createEntityAdapter, IdSelector } from '@ngrx/entity';
import { UserAppState } from './user.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UserItem, UserRolItem } from '@amad-web-admin/modules/network';
import {
  userAppAction,
  userRequestAction,
  userResponseAction,
} from './user.actions';

export const USER_FEATURE_KEY = 'module-user';
const selectUserId: IdSelector<UserItem> = ({ id_usuario }) => id_usuario;
const selectRolId: IdSelector<UserRolItem> = ({ id_rol }) => id_rol;

export const userAdapter: EntityAdapter<UserItem> =
  createEntityAdapter<UserItem>({
    selectId: selectUserId,
  });

export const userRolAdapter: EntityAdapter<UserRolItem> =
  createEntityAdapter<UserRolItem>({
    selectId: selectRolId,
  });
export const userInitialState: UserAppState = {
  anySuccess: undefined,
  error: undefined,
  loader: false,
  userState: userAdapter.getInitialState({
    selectedUserItem: null,
  }),
  userRolesState: userRolAdapter.getInitialState(),
};

export const userReducer = createReducer(
  userInitialState,
  on(userResponseAction.successList, (state, items) => ({
    ...state,
    userState: userAdapter.addMany(items.value, state.userState),
    error: null,
    loader: false,
  })),
  on(userRequestAction.list, (state) => ({
    ...state,
    userState: userAdapter.setAll([], state.userState),
    loader: true,
  })),
  on(userRequestAction.getInformation, (state) => ({
    ...state,
    loader: true,
    userState: {
      ...state.userState,
      selectedUserItem: null,
    },
  })),
  on(userResponseAction.successGetInformation, (state, item) => ({
    ...state,
    loader: false,
    userState: {
      ...state.userState,
      selectedUserItem: item.value,
    },
  })),

  on(userRequestAction.delete, (state) => ({
    ...state,
    loader: true,
  })),
  on(userResponseAction.successDelete, (state, item) => ({
    ...state,
    loader: false,
    userState: userAdapter.removeOne(item.value.id_usuario, state.userState),
  })),
  on(userRequestAction.add, (state) => ({
    ...state,
    loader: true,
    anySuccess: undefined,
  })),
  on(userResponseAction.successAdd, (state, item) => ({
    ...state,
    anySuccess: item.value,
    loader: false,
  })),

  on(userRequestAction.edit, (state) => ({
    ...state,
    loader: true,
    anySuccess: undefined,
  })),
  on(userResponseAction.successEdit, (state, item) => ({
    ...state,
    anySuccess: item.value,
  })),
  on(userAppAction.fail, (state, action) => ({
    ...state,
    loader: false,
    selectedUserItem: null,
    error: action.error,
  })),
  on(userResponseAction.successListRoles, (state, items) => ({
    ...state,
    loader: false,
    userRolesState: userRolAdapter.addMany(items.value, state.userRolesState),
  })),
  on(userRequestAction.listRoles, (state) => ({
    ...state,
    userRolesState: userRolAdapter.setAll([], state.userRolesState),
    loader: true,
  })),
  on(userAppAction.reset, (state) => ({
    ...state,
    userInitialState,
  }))
);

export const userFeature = createFeature({
  name: USER_FEATURE_KEY,
  reducer: userReducer,
});
