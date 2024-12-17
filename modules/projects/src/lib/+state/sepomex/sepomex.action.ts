import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CPResponse,
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '@amad-web-admin/modules/network';

export const sepomexActionRequest = createActionGroup({
  source: 'sepomex',
  events: {
    listState: emptyProps(),
    listMunicipality: props<{ idState: number }>(),
    listNeighborhoods: props<{ idMunicipality: number }>(),
    searchCP: props<{ cp: string }>(),
  },
});
export const sepomexActionResponse = createActionGroup({
  source: 'sepomex',
  events: {
    successListState: props<{ value: StatesResponse[] }>(),
    successListMunicipality: props<{ value: MunicipalityResponse[] }>(),
    successListNeighborhoods: props<{ value: NeighborhoodsResponse[] }>(),
    successSearchCP: props<{ value: CPResponse }>(),
  },
});
export const sepomexAppAction = createActionGroup({
  source: 'sepomex',
  events: {
    fail: props<{ error: any }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
