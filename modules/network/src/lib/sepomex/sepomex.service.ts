import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CPResponse,
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '@amad-web-admin/shared';
import { sepomexEndPoints } from './sepomex.end-points';

@Injectable({
  providedIn: 'root',
})
export class SepomexService {
  headers = {
    header_sepomex_api: 'true',
    sepomex_url: 'true',
  };

  constructor(private http: HttpClient) {}

  listStates(): Observable<StatesResponse[]> {
    return this.http.get<StatesResponse[]>(sepomexEndPoints.GET_ALL_STATES, {
      headers: this.headers,
    });
  }

  listMunicipality(state: number): Observable<MunicipalityResponse[]> {
    return this.http.get<MunicipalityResponse[]>(
      `${sepomexEndPoints.GET_ALL_MUNICIPALITY_X_STATES}${state}`,
      {
        headers: this.headers,
      }
    );
  }

  listNeighborhood(idMunicipality: number): Observable<NeighborhoodsResponse[]> {
    return this.http.get<NeighborhoodsResponse[]>(
      `${sepomexEndPoints.GET_ALL_COLONY_X_STATES}${idMunicipality}`,
      {
        headers: this.headers,
      }
    );
  }

  searchForCP(cp: string): Observable<CPResponse> {
    return this.http.get<CPResponse>(`${sepomexEndPoints.SEARCH_FOR_CP}/${cp}`, {
      headers: this.headers,
    });
  }
}
