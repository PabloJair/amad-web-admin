import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { UserRolItem } from '@amad-web-admin/modules/network';
import { LocalStorageService } from 'angular-web-storage';

@Injectable()
export class RolPermissionNavigationService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService
  ) {}

  private KEY_EDIT_ROL = 'KEY_EDIT_ROL';

  getEditRolPermission(): UserRolItem {
    return this.router.getCurrentNavigation()?.extras.state as UserRolItem;
  }

  setEditRolPermission(element: UserRolItem) {
    this.localStorage.set(this.KEY_EDIT_ROL, element);
  }

  getEditRolPermissionFromLocalStorage(): UserRolItem {
    return this.localStorage.get(this.KEY_EDIT_ROL);
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
    this.setEditRolPermission(element);
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
