import {
  CPResponse,
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '@amad-web-admin/shared';

export interface SepomexState {
  states: StatesResponse[];
  municipality: MunicipalityResponse[];
  neighborhoods: NeighborhoodsResponse[];
  searchCP: CPResponse | undefined;
  loader: boolean;
  error: Error | undefined;
}
