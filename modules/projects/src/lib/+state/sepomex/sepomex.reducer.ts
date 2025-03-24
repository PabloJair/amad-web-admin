import { SepomexState } from './sepomex.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { sepomexActionRequest, sepomexActionResponse, sepomexAppAction } from './sepomex.action';
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
  on(sepomexActionRequest.listMunicipality, (state) => ({
    ...state,
    municipality: [],
    neighborhoods: [],
    error: undefined,
    loader: true,
  })),
  on(sepomexActionRequest.listState, (state) => ({
    ...state,
    states: [],
    municipality: [],
    neighborhoods: [],
    error: undefined,
    loader: true,
  })),
  on(sepomexActionRequest.listMunicipality, (state) => ({
    ...state,
    neighborhoods: [],
    error: undefined,
    loader: true,
  })),
  on(sepomexActionRequest.searchCP, (state) => ({
    ...state,
    states: [],
    municipality: [],
    neighborhoods: [],
    searchCP: undefined,
    error: undefined,
    loader: true,
  })),
  on(sepomexActionResponse.successListState, (state, action) => ({
    ...state,
    states: action.value,
    error: undefined,
    loader: false,
  })),
  on(sepomexActionResponse.successListMunicipality, (state, action) => ({
    ...state,
    municipality: action.value,
    error: undefined,
    loader: false,
  })),
  on(sepomexActionResponse.successListNeighborhoods, (state, action) => ({
    ...state,
    neighborhoods: action.value,
    error: undefined,
    loader: false,
  })),
  on(sepomexActionResponse.successSearchCP, (state, action) => ({
    ...state,
    searchCP: action.value,
    error: undefined,
    loader: false,
  })),

  on(sepomexAppAction.fail, (state, action) => ({
    ...state,
    loader: false,
    neighborhoods: [],
    states: [],
    municipality: [],
    searchCP: undefined,
    error: action.error as Error,
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
