export interface StatesResponse {
  id_estado: number;
  estado: string;
}

export interface MunicipalityResponse {
  id_municipio: number;
  municipio: string;
}

export interface NeighborhoodsResponse {
  id_colonia: number;
  colonia: string;
}

export interface CPResponse {
  lista_colonias: NeighborhoodsResponse[];
  estado: StatesResponse[];
  municipio: MunicipalityResponse[];
}
