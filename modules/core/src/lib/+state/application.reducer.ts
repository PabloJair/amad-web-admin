import { createReducer, on } from '@ngrx/store';
import { ApplicationEntity } from './application.models';
import { logout } from './application.actions';

export const APPLICATION_FEATURE_KEY = 'application';

const initApplicationReducer: ApplicationEntity = {
  hasSession: false,
};

const reducer = createReducer(
  initApplicationReducer,
  on(logout, (state: ApplicationEntity): ApplicationEntity => {
    return {
      ...state,
      hasSession: initApplicationReducer.hasSession,
    };
  }),
);

export const appStoreReducer = {
  application: reducer,
};
