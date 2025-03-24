import { EntityState } from '@ngrx/entity';
import {
  AddOrEditProject,
  CompanyItem,
  LanguagesProject,
  ProjectInformation,
  ProjectItem,
} from '@amad-web-admin/shared';

export type ProjectsState = EntityState<ProjectItem>;
export type CompaniesState = EntityState<CompanyItem>;

export interface ProjectAppState {
  loader: boolean;
  error: unknown;
  anySuccess: AddOrEditProject | number | string | undefined;
  projectInformation: ProjectInformation | undefined;
  company: CompanyItem | undefined;
  projects: ProjectsState;
  companies: CompaniesState;
  languages: LanguagesProject[];
}
