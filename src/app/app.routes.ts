import { Route } from '@angular/router';
import { Page404Component } from '@amad-web-admin/modules/ui-elements';
import { NavigationRoutes } from '@amad-web-admin/modules/core';

export const appRoutes: Route[] = [
  {
    path: NavigationRoutes.dashboard.DASHBOARD,
    loadChildren: () =>
      import('@amad-web-admin/modules/dashboard').then(
        value => value.dashboardRoutes,
      ),
  },
  {
    path: NavigationRoutes.authentication.AUTHENTICATION,
    loadChildren: () =>
      import('@amad-web-admin/modules/authentication').then(
        value => value.modulesAuthenticationRoutes,
      ),
  },
  { path: '**', pathMatch: 'full', component: Page404Component },
];
