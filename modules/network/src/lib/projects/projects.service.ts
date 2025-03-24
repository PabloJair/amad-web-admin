import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { projectsEndpoints } from './projects.endpoints';
import {
  FilterProjects,
  AddOrEditProject,
  CompanyItem,
  CreateJsonProject,
  LanguagesProject,
  ProjectInformation,
  ProjectItem,
  StatusProject,
  UpdateJsonProjectLayout,
  BaseResponse,
} from '@amad-web-admin/shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  listCompany(filter: FilterProjects): Observable<BaseResponse<CompanyItem[]>> {
    return this.http.post<BaseResponse<CompanyItem[]>>(projectsEndpoints.POST_LIST_COMPANY, filter);
  }

  addProject(project: AddOrEditProject): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(projectsEndpoints.ADD_PROJECTS, project);
  }

  getProjectInformation(project: ProjectItem): Observable<BaseResponse<ProjectInformation>> {
    return this.http.get<BaseResponse<ProjectInformation>>(
      `${projectsEndpoints.GET_PROJECT_INFORMATION}${project.id_application}`
    );
  }

  createJsonProject(createJsonProject: CreateJsonProject): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(
      projectsEndpoints.POST_CREATE_JSON,
      createJsonProject
    );
  }

  changeStatusCompany(
    idProject: number,
    status: StatusProject
  ): Observable<BaseResponse<CompanyItem>> {
    return this.http.put<BaseResponse<CompanyItem>>(
      `${projectsEndpoints.PUT_STATUS_COMPANY}${idProject}`,
      status
    );
  }

  putProject(
    idProject: number,
    addOrEditProjectRequest: AddOrEditProject
  ): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(
      `${projectsEndpoints.PUT_PROJECT}${idProject}`,
      addOrEditProjectRequest
    );
  }

  listProject(idCompany: string): Observable<BaseResponse<ProjectItem[]>> {
    const url = projectsEndpoints.GET_LIST_PROJECTS.replace('idCompany', idCompany);
    return this.http.get<BaseResponse<ProjectItem[]>>(url);
  }

  putProjectJson(
    updateJsonProjectLayout: UpdateJsonProjectLayout,
    idProject: string
  ): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(
      `${projectsEndpoints.PUT_UPDATE_JSON}${idProject}`,
      updateJsonProjectLayout
    );
  }

  getLanguages(): Observable<BaseResponse<LanguagesProject[]>> {
    return this.http.get<BaseResponse<LanguagesProject[]>>(projectsEndpoints.GET_LANGUAGES);
  }
}
