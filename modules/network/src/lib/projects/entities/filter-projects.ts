import { CompanyStatus } from '../../companies/entities/company-status';

export interface FilterProjects {
  nombre_comercial?: string;
  status: CompanyStatus;
}
