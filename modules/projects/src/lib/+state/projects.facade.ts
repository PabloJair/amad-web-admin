import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { projectsSelector } from './projects.selector';
import { filter, skip } from 'rxjs';
import {
  AddOrEditProjectRequest,
  CreateJsonProject,
  FilterProjects,
  ProjectItem,
  ProjectStatus,
  UpdateJsonProjectLayout,
} from '@amad-web-admin/modules/network';
import { projectAppAction, projectRequestAction } from './projects.actions';

@Injectable()
export class ProjectsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(projectsSelector.loader), skip(1));
  listProjects$ = this.store.pipe(select(projectsSelector.projects));
  listCompanies$ = this.store.pipe(select(projectsSelector.companies));
  anySuccess = this.store.pipe(select(projectsSelector.anySuccess), skip(1));
  successLanguages = this.store.pipe(select(projectsSelector.languages));
  error$ = this.store.pipe(select(projectsSelector.error), skip(1));
  successUserInformation$ = this.store.pipe(
    select(projectsSelector.projectInformation),
    filter((filter) => filter != undefined)
  );

  public getListCompanies(filter: FilterProjects) {
    this.store.dispatch(projectRequestAction.listCompany({ value: filter }));
  }

  public getListProjects(value: string) {
    this.store.dispatch(projectRequestAction.listProjects({ value: value }));
  }

  public addProject(value: AddOrEditProjectRequest) {
    this.store.dispatch(projectRequestAction.add({ value: value }));
  }

  public editProject(idProject: number, value: AddOrEditProjectRequest) {
    this.store.dispatch(projectRequestAction.edit({ idProject, value }));
  }

  public changeStatus(idProject: number, status: ProjectStatus) {
    this.store.dispatch(
      projectRequestAction.changeStatusProject({
        idProject,
        status: { status: status },
      })
    );
  }

  public getLanguages() {
    this.store.dispatch(projectRequestAction.getLanguages());
  }

  public UpdateJsonProject(value: UpdateJsonProjectLayout, id: number) {
    this.store.dispatch(
      projectRequestAction.updateJsonProject({ value, id: id.toString() })
    );
  }

  public createJsonProject(value: CreateJsonProject) {
    this.store.dispatch(projectRequestAction.createJsonProject({ value }));
  }

  public userInformation(value: ProjectItem) {
    this.store.dispatch(projectRequestAction.getInformationProject({ value }));
  }

  public reset() {
    this.store.dispatch(projectAppAction.reset());
  }
}
