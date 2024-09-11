import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import {
  UserEdit,
  UserItem,
  UserRolItem,
} from '@amad-web-admin/modules/network';

@Injectable()
export class RolPermissionNavigationService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  getEditRolPermission(): UserRolItem {
    return this.router.getCurrentNavigation()?.extras.state as UserRolItem;
  }

  navigateToAdd() {
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.rolesAndPermission.ROLES,
        NavigationRoutes.rolesAndPermission.ROLES_ADD,
      ])
      .then(() => true);
  }

  navigateToEdit(element: UserRolItem) {
    const navigationExtras: NavigationExtras = {
      state: element,
    };
    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.rolesAndPermission.ROLES,
          NavigationRoutes.rolesAndPermission.ROLES_EDIT,
        ],
        navigationExtras
      )
      .then(() => true);
  }

  navigateToList() {
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.rolesAndPermission.ROLES,
      ])
      .then(() => true);
  }
}
