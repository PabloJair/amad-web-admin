import { EntityState } from '@ngrx/entity';
import { CompanyItem } from '@amad-web-admin/shared';

export type CompaniesState = EntityState<CompanyItem>;

export interface CompanyAppState {
  loader: boolean;
  error: unknown;
  anySuccess: string | undefined;
  company: CompanyItem | undefined;
  companies: CompaniesState;
}
