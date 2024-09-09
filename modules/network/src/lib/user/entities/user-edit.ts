import { UserStatus } from './user-status';

export interface UserEdit {
  nombre: string;
  a_paterno: string;
  a_materno: string;
  user: string;
  email: string;
  rol: number;
  estatus: UserStatus;
  id_usuario: number;
  proyectos: number[];
}
