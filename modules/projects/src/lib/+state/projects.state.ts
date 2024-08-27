import {
  CompanyItem,
  ProjectInformationResponse, ProjectItem
} from '@amad-web-admin/modules/network';
import { EntityState } from '@ngrx/entity';

export interface ProjectInformationState extends EntityState<ProjectInformationResponse> {
  selectedUserItem: ProjectInformationResponse | null;
}

export type ProjectsState = EntityState<ProjectItem>;
export type CompaniesState = EntityState<CompanyItem>;

export interface ProjectAppState {
  loader: boolean;
  error: any;
  anySuccess: any;
  projectInformation:ProjectInformationState|undefined
  company:CompanyItem|undefined
  projects: ProjectsState;
  companies: CompaniesState;
}
