export interface UserInformation {
  usuario: string;
  permisos: Permiso;
}

export interface Rol {
  desc_rol: string;
  desc_larga: string;
  id_rol: number;
  status: number;
  permisos: Permiso[];
}

export interface Permiso {
  id_permiso: number;
  modulo: string;
  func1?: string;
  func2?: string;
  func3?: string;
  func4?: string;
  func5?: string;
  func6?: string;
  func7?: string;
  func8?: string;
  func9?: string;
  func10?: string;
  func11?: string;
  func12?: string;
  func13?: string;
  func14?: string;
  func15?: string;
  func16?: string;
  func17?: string;
  func18?: string;
}
