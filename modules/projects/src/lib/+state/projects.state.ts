import {
  CompanyItem,
  LanguagesProject,
  ProjectInformation,
  ProjectItem,
} from '@amad-web-admin/modules/network';
import { EntityState } from '@ngrx/entity';

export type ProjectsState = EntityState<ProjectItem>;
export type CompaniesState = EntityState<CompanyItem>;

export interface ProjectAppState {
  loader: boolean;
  error: any;
  anySuccess: any;
  projectInformation: ProjectInformation | undefined;
  company: CompanyItem | undefined;
  projects: ProjectsState;
  companies: CompaniesState;
  languages: LanguagesProject[];
}
