import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { APPLICATION_LOGOUT_ACTION } from './application.actions';

export function logoutMetaReducer<State>(reducer: ActionReducer<State>): ActionReducer<State> {
  return function clearStateFn(state: State | undefined, action: Action): State {
    if (action.type === APPLICATION_LOGOUT_ACTION) {
      state = undefined; // limpia el estado de forma compatible con Store
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logoutMetaReducer];
