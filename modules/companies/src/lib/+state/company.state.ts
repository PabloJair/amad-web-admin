import {
  CompanyItem,
  ProjectInformation,
  ProjectItem,
} from '@amad-web-admin/modules/network';
import { EntityState } from '@ngrx/entity';

export type CompaniesState = EntityState<CompanyItem>;

export interface CompanyAppState {
  loader: boolean;
  error: any;
  anySuccess: any;
  company: CompanyItem | undefined;
  companies: CompaniesState;
}
