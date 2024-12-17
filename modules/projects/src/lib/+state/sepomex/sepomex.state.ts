import {
  CPResponse,
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '@amad-web-admin/modules/network';

export interface SepomexState {
  states: StatesResponse[];
  municipality: MunicipalityResponse[];
  neighborhoods: NeighborhoodsResponse[];
  searchCP: CPResponse | undefined;
  loader: boolean;
  error: any;
}
