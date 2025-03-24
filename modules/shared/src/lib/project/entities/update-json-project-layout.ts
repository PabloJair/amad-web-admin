import { ApplicantProjectStatus } from './applicant-project-status';

export interface UpdateJsonProjectLayout {
  id_application: number;
  json: string;
  language: string;
  status: ApplicantProjectStatus;
}
