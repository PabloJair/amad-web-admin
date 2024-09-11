import { CompanyStatus } from './company-status';

export interface EditCompany {
  status: CompanyStatus;
  nombre_comercial: string;
  nombre: string;
  contacto: string;
  telefono: string;
}
