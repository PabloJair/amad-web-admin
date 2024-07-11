import { createAction } from '@ngrx/store';

export const APPLICATION_LOGOUT_ACTION = 'APPLICATION_LOGOUT_ACTION';

export const logout = createAction(APPLICATION_LOGOUT_ACTION);
