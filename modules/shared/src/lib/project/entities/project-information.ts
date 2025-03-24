import { ProjectItem } from './project-item';
import { JsonProject } from './json-project';

export interface ProjectInformation {
  jsons: JsonProject[];
  application: ProjectItem[];
}
