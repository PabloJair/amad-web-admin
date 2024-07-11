import { UserStatus } from './user-status';

export interface UserEdit {
  nombre: string;
  a_paterno: string;
  a_materno: string;
  password: string;
  user: string;
  email: string;
  rol: number;
  status: UserStatus;
  proyectos: number[];
}
