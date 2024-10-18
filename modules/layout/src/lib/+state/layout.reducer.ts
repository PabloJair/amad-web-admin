import { createFeature, createReducer, on } from '@ngrx/store';
import { LayoutState } from './layout.state';
import { layoutRequestAction, layoutResponseAction } from './layout.actions';

export const LAYOUT_FEATURE_KEY = 'module-layout';

export const layoutInitialState: LayoutState = {
  anySuccess: undefined,
  error: undefined,
  loader: false,
};

export const layoutReducer = createReducer(
  layoutInitialState,
  on(layoutRequestAction.updateJsonProject, (state, items) => ({
    ...state,
    anySuccess: null,
    error: null,
    loader: true,
  })),
  on(layoutResponseAction.successUpdateJsonProject, (state, items) => ({
    ...state,
    anySuccess: items.value,
    error: null,
    loader: false,
  }))
);

export const layoutFeature = createFeature({
  name: LAYOUT_FEATURE_KEY,
  reducer: layoutReducer,
});
