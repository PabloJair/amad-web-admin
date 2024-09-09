import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { CompanyItem, ProjectItem } from '@amad-web-admin/modules/network';

@Injectable()
export class ProjectNavigationService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  navigateToEdit(projectItem: ProjectItem, companyItem: CompanyItem) {
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

  navigateToLayout(idProjectItem: ProjectItem) {
    this.router
      .navigate(
        [NavigationRoutes.dashboard.DASHBOARD, NavigationRoutes.layout.HOME],
        {
          state: {
            idProjectItem,
          },
        }
      )
      .then(() => true);
  }

  navigateToList() {
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.projects.PROJECT,
      ])
      .then(() => true);
  }
}
