import { UserStatus } from './user-status';

export interface ModuleUserInformation {
  userData: UserData;
  proyectos: Proyecto[];
}

export interface UserData {
  nombre: string;
  a_paterno: string;
  a_materno: string;
  password: string;
  user: string;
  email: string;
  rol: number;
  status: UserStatus;
  id_usuario: number;
}

export interface Proyecto {
  id_rel: number;
  id_usuario: number;
  id_proyecto: number;
}
