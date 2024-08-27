import { Route } from '@angular/router';
import {
  ApplicationNavigate,
  AuthenticationInformationService,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { ModulesDashboardComponent } from './modules-dashboard/modules-dashboard.component';
import { Page404Component } from '@amad-web-admin/modules/ui-elements';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: ModulesDashboardComponent,
    providers: [AuthenticationInformationService, ApplicationNavigate],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@amad-web-admin/modules/home').then(
            value => value.modulesHomeRoutes,
          ),
      },
      {
        path: NavigationRoutes.userRoutes.USER,
        loadChildren: () =>
          import('@amad-web-admin/modules/user').then(
            value => value.modulesUserRoutes,
          ),
      },
      {
        path: NavigationRoutes.rolesAndPermission.ROLES,
        loadChildren: () =>
          import('@amad-web-admin/modules/rol-permission').then(
            value => value.modulesRolPermissionRoutes,
          ),
      },
      {
        path: NavigationRoutes.layout.home,
        loadChildren: () =>
          import('@amad-web-admin/modules/layout').then(
            value => value.modulesLayoutRoutes,
          ),
      },
      {
        path: NavigationRoutes.projects.PROJECT,
        loadChildren: () =>
          import('@amad-web-admin/modules/projects').then(
            value => value.modulesProjectsRoutes,
          ),
      },
      { path: '**', pathMatch: 'full', component: Page404Component },
    ],
  },
];
