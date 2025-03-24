import {
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '@amad-web-admin/shared';

export interface LocationConfiguration {
  state?: StatesResponse;
  municipality?: MunicipalityResponse;
  neighborhoods?: NeighborhoodsResponse;
}
