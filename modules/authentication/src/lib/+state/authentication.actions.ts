import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Login2fRequest,
  LoginRequest,
  LoginResponse,
  UserInformation,
} from '@amad-web-admin/shared';

export const authenticationAction = createActionGroup({
  source: '[Authentication]',
  events: {
    successFistLogin: props<{ value: LoginResponse }>(),
    successLogin: props<{ value: UserInformation }>(),
    fail: props<{ error: unknown }>(),
    loginRequest: props<{ request: LoginRequest }>(),
    login2F: props<{ request: Login2fRequest; token: string }>(),

    undo: emptyProps(),
  },
});
