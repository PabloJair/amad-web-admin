import { CompanyStatus } from '@amad-web-admin/shared';

export interface FilterProjects {
  nombre_comercial?: string;
  status: CompanyStatus;
}
