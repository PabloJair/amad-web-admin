import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { JsonProject, ProjectItem } from '@amad-web-admin/shared';

@Injectable()
export class NavigationLayoutService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService
  ) {}

  private KEY_JSON_PROJECT = 'KEY_JSON_PROJECT';

  getJsonConfiguration(): {
    jsonProject: JsonProject;
    codeLanguage: string;
    project: ProjectItem;
  } {
    const project = this.router.getCurrentNavigation()?.extras.state as {
      jsonProject: JsonProject;
      codeLanguage: string;
      project: ProjectItem;
    };
    return project !== undefined ? project : this.localStorage.get(this.KEY_JSON_PROJECT);
  }

  saveLocalJson(jsonProject: JsonProject, codeLanguage: string, project: ProjectItem): void {
    const state = {
      jsonProject,
      codeLanguage,
      project,
    };
    this.localStorage.set(this.KEY_JSON_PROJECT, state);
  }
}
