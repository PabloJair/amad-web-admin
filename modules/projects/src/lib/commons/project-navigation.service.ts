import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import {
  CompanyItem,
  JsonProject,
  ProjectItem,
} from '@amad-web-admin/modules/network';
import { LocalStorageService } from 'angular-web-storage';
import { Location } from '@angular/common';

@Injectable()
export class ProjectNavigationService {
  constructor(
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly location: Location
  ) {}

  private KEY_PROJECT = 'projectItem';
  private KEY_JSON_PROJECT = 'KEY_JSON_PROJECT';

  getEditProject(): ProjectItem {
    const project = this.router.getCurrentNavigation()?.extras
      .state as ProjectItem;
    return project !== undefined
      ? project
      : this.localStorage.get(this.KEY_PROJECT);
  }

  getJsonConfiguration(): {
    jsonProject: JsonProject;
    codeLanguage: string;
    project: ProjectItem;
  } {
    const project = this.router.getCurrentNavigation()?.extras
      .state as JsonProject;
    return project !== undefined
      ? project
      : this.localStorage.get(this.KEY_JSON_PROJECT);
  }

  navigateToEdit(projectItem: ProjectItem, companyItem: CompanyItem) {
    this.localStorage.remove(this.KEY_PROJECT);

    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.projects.PROJECT,
          NavigationRoutes.projects.PROJECT_EDIT,
        ],
        {
          state: {
            projectItem,
            companyItem,
          },
        }
      )
      .then(() => true);
  }

  navigateToAdd(companyItem: CompanyItem) {
    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.projects.PROJECT,
          NavigationRoutes.projects.PROJECT_ADD,
        ],
        {
          state: {
            companyItem,
          },
        }
      )
      .then(() => true);
  }

  navigateToLayout(
    jsonProject: JsonProject,
    project: ProjectItem,
    codeLanguage: string
  ) {
    const state = {
      jsonProject,
      codeLanguage,
      project,
    };
    this.router
      .navigate(
        [NavigationRoutes.dashboard.DASHBOARD, NavigationRoutes.layout.HOME],
        {
          state: state,
        }
      )
      .then(() => true);
    this.localStorage.set(this.KEY_JSON_PROJECT, state);
  }

  navigateToConfiguration(
    jsonProject: JsonProject,
    project: ProjectItem,
    codeLanguage: string
  ) {
    const state = {
      jsonProject,
      codeLanguage,
      project,
    };
    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.projects.PROJECT,
          NavigationRoutes.projects.PROJECT_CONFIGURATIONS,
        ],
        {
          state: state,
        }
      )
      .then(() => true);
    this.localStorage.set(this.KEY_JSON_PROJECT, state);
  }

  navigateToList() {
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.projects.PROJECT,
      ])
      .then(() => true);
  }

  back() {
    this.location.back();
  }

  navigateToInformationData(
    jsonProject: JsonProject,
    project: ProjectItem,
    codeLanguage: string
  ) {
    const state = {
      jsonProject,
      codeLanguage,
      project,
    };
    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.projects.PROJECT,
          NavigationRoutes.projects.PROJECT_PERSONAL_INFORMATION,
        ],
        {
          state: state,
        }
      )
      .then(() => this.localStorage.set(this.KEY_JSON_PROJECT, state));
  }
}
