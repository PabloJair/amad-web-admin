import { ProjectStatus } from './project-status';

export interface CompanyItem {
  contacto: string;
  id_cia: number;
  status: ProjectStatus;
  nombre: string;
  nombre_comercial: string;
  id_app_google: string;
  telefono: string;
}
