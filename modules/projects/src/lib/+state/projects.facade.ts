import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { projectsSelector } from './projects.selector';
import { filter, skip } from 'rxjs';
import {
  AddOrEditProjectRequest,
  FilterProjects, ProjectItem, ProjectStatus, StatusProject
} from '@amad-web-admin/modules/network';
import { projectAppAction, projectRequestAction } from './projects.actions';

@Injectable()
export class ProjectsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(projectsSelector.loader), skip(1));
  listProjects$ = this.store.pipe(select(projectsSelector.projects));
  listCompanies$ = this.store.pipe(select(projectsSelector.companies));
  successAddCompany = this.store.pipe(select(projectsSelector.anySuccess),skip(1));
  error$ = this.store.pipe(select(projectsSelector.error), skip(1));
  userInformation$ = this.store.pipe(
    select(projectsSelector.projectInformation),
    filter(filter => filter != undefined),

  );

  public getListCompanies(filter: FilterProjects) {
    this.store.dispatch(projectRequestAction.listCompany({ value: filter }));
  }
  public getListProjects(value: string) {
    this.store.dispatch(projectRequestAction.listProjects({ value: value }));
  }

  public addProject(value:AddOrEditProjectRequest) {
    this.store.dispatch(projectRequestAction.add({ value: value }));
  }

  public changeStatus(idProject: number,status:ProjectStatus) {
    this.store.dispatch(projectRequestAction.changeStatusProject({ idProject,status:{status:status}}));
  }
  public userInformation(value: ProjectItem) {
    this.store.dispatch(projectRequestAction.getInformationProject({ value }));
  }


  public reset() {
    this.store.dispatch(projectAppAction.reset());
  }
}
