import { Route } from '@angular/router';
import { ModulesRolPermissionComponent } from './modules-rol-permission/modules-rol-permission.component';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolesAndPermissionFacade } from './+store/roles-and-permission.facade';
import { provideEffects } from '@ngrx/effects';
import { RolesAndPermissionsEffects } from './+store/roles-and-permissions.effects';
import { provideState } from '@ngrx/store';
import { rolesAndPermissionsFeature } from './+store/roles-and-permissions.reducer';
import { RolAddComponent } from './rol-add/rol-add.component';
import { RolEditComponent } from './rol-edit/rol-edit.component';
import { RolPermissionNavigationService } from './commons/rol-permission-navigation.service';

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
        path: NavigationRoutes.rolesAndPermission.ROLES_ADD,
        component: RolAddComponent,
      },
      {
        path: NavigationRoutes.rolesAndPermission.ROLES_EDIT,
        component: RolEditComponent,
      },
    ],
    providers: [
      RolesAndPermissionFacade,
      RolPermissionNavigationService,
      provideEffects([RolesAndPermissionsEffects]),
      provideState(rolesAndPermissionsFeature),
    ],
  },
];
