import { ApplicantProject, createDefaultApplicantProject } from './applicant-project';

export interface JsonProject {
  id_application: number;
  id_json: number;
  status: number;
  is_default: boolean;
  language: string;
  json: string;
}

export function getJsonData(jsonProject: JsonProject): ApplicantProject {
  try {
    return JSON.parse(jsonProject.json);
  } catch (error) {
    console.error('Error al parsear el JSON:', error);
    return createDefaultApplicantProject();
  }
}
