import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import {APPLICATION_LOGOUT_ACTION} from "./application.actions";

function LogoutMetaReducer<State>(
  reducer: ActionReducer<State>,
): ActionReducer<any> {
  return function clearStateFn(state: State, action: Action) {
    if (action.type === APPLICATION_LOGOUT_ACTION) {
      state = {} as State; // ==> Emptying state here
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [LogoutMetaReducer];
