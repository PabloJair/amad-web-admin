import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../base-response';
import { projectsEndpoints } from './projects.endpoints';
import { FilterProjects } from './entities/filter-projects';
import { AddOrEditProjectRequest, CompanyItem, ProjectItem, StatusProject } from './entities/projects.entities';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  listCompany(filter: FilterProjects): Observable<BaseResponse<CompanyItem[]>> {
    return this.http.post<BaseResponse<CompanyItem[]>>(
      projectsEndpoints.POST_LIST_COMPANY,
      filter,
    );
  }

  addProject(project: AddOrEditProjectRequest): Observable<BaseResponse<number>> {
    return this.http.post<BaseResponse<number>>(
      projectsEndpoints.ADD_PROJECTS,
      project,
    );
  }

  changeStatusCompany(idProject:number,status:StatusProject): Observable<BaseResponse<CompanyItem>> {
    return this.http.put<BaseResponse<CompanyItem>>(
      `${projectsEndpoints.PUT_STATUS_COMPANY}${idProject}`,
      status,
    );
  }

  listProject(idCompany:string): Observable<BaseResponse<ProjectItem[]>> {
    const url = projectsEndpoints.GET_LIST_PROJECTS.replace("idCompany",idCompany)
    return this.http.get<BaseResponse<ProjectItem[]>>(url);
  }
}
