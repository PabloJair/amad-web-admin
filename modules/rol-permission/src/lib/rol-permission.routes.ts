import { Route } from '@angular/router';
import { ModulesRolPermissionComponent } from './modules-rol-permission/modules-rol-permission.component';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolesAndPermissionFacade } from './+store/roles-and-permission.facade';
import { provideEffects } from '@ngrx/effects';
import { RolesAndPermissionsEffects } from './+store/roles-and-permissions.effects';
import { provideState } from '@ngrx/store';
import { rolesAndPermissionsFeature } from './+store/roles-and-permissions.reducer';

export const modulesRolPermissionRoutes: Route[] = [
  {
    path: '',
    component: ModulesRolPermissionComponent,
    children: [
      {
        path: '',
        component: RolListComponent,
      },
      {
        path: NavigationRoutes.rolesAndPermission.ROLES,
        component: RolListComponent,
      },
    ],
    providers: [
      RolesAndPermissionFacade,
      provideEffects([RolesAndPermissionsEffects]),
      provideState(rolesAndPermissionsFeature),
    ],
  },
];
