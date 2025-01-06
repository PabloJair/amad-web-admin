import { UserStatus } from './user-status';

export interface UserEdit {
  nombre: string;
  a_paterno: string;
  a_materno: string;
  user: string;
  email: string;
  rol: number;
  status: UserStatus;
  id_usuario: number;
  password: string | null;
  proyectos: number[];
}
