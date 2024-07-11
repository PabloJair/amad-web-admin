import { createReducer, on, createFeature } from '@ngrx/store';
import { AuthenticationEntity } from './authentication.models';
import { authenticationAction } from './authentication.actions';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

const initialState: AuthenticationEntity = {
  showGoogleCode: null,
  error: null,
  userInformation: null,
  loaded: false,
};
const reducer = createReducer(
  initialState,
  on(authenticationAction.loginRequest, state => ({
    ...state,
    loaded: true,
    userInformation: null,
    showGoogleCode: null,
  })),
  on(authenticationAction.login2F, state => ({
    ...state,
    loaded: true,
    userInformation: null,
    showGoogleCode: null,
  })),
  on(authenticationAction.successFistLogin, (state, data) => ({
    ...state,
    loaded: false,
    showGoogleCode: {
      qrCode: data.value.qrCode,
      token: data.value.token,
    },
    userInformation: null,
  })),
  on(authenticationAction.successLogin, (state, value) => ({
    ...state,
    loaded: false,
    showGoogleCode: null,
    userInformation: value.value,
  })),
  on(authenticationAction.fail, (state, value) => ({
    ...state,
    loaded: false,
    error: value,
    userInformation: null,
    showGoogleCode: null,
  })),
);
export const authenticationFeature = createFeature({
  name: AUTHENTICATION_FEATURE_KEY,
  reducer: reducer,
});
