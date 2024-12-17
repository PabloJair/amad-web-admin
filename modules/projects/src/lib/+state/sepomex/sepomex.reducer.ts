import { SepomexState } from './sepomex.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  sepomexActionRequest,
  sepomexActionResponse,
  sepomexAppAction,
} from './sepomex.action';
import { projectInitialState } from '../projects.reducer';

export const SEPOMEX_REDUCER_KEY = 'sepomex';

export const sepomexInitalState: SepomexState = {
  searchCP: undefined,
  states: [],
  municipality: [],
  neighborhoods: [],
  loader: false,
  error: undefined,
};

export const sepomexReducer = createReducer(
  sepomexInitalState,
  on(sepomexActionRequest.listMunicipality, (state, action) => ({
    ...state,
    municipality: [],
    neighborhoods: [],
    error: null,
    loader: true,
  })),
  on(sepomexActionRequest.listState, (state, action) => ({
    ...state,
    states: [],
    municipality: [],
    neighborhoods: [],
    error: null,
    loader: true,
  })),
  on(sepomexActionRequest.listMunicipality, (state, action) => ({
    ...state,
    neighborhoods: [],
    error: null,
    loader: true,
  })),
  on(sepomexActionRequest.searchCP, (state, action) => ({
    ...state,
    states: [],
    municipality: [],
    neighborhoods: [],
    searchCP: undefined,
    error: null,
    loader: true,
  })),
  on(sepomexActionResponse.successListState, (state, action) => ({
    ...state,
    states: action.value,
    error: null,
    loader: false,
  })),
  on(sepomexActionResponse.successListMunicipality, (state, action) => ({
    ...state,
    municipality: action.value,
    error: null,
    loader: false,
  })),
  on(sepomexActionResponse.successListNeighborhoods, (state, action) => ({
    ...state,
    neighborhoods: action.value,
    error: null,
    loader: false,
  })),
  on(sepomexActionResponse.successSearchCP, (state, action) => ({
    ...state,
    searchCP: action.value,
    error: null,
    loader: false,
  })),

  on(sepomexAppAction.fail, (state, action) => ({
    ...state,
    loader: false,
    neighborhoods: [],
    states: [],
    municipality: [],
    searchCP: undefined,
    error: action.error,
  })),

  on(sepomexAppAction.reset, (state) => ({
    ...state,
    projectInitialState,
  }))
);

export const sepomexFeature = createFeature({
  name: SEPOMEX_REDUCER_KEY,
  reducer: sepomexReducer,
});
