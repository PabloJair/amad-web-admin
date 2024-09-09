import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { UserEdit, UserItem } from '@amad-web-admin/modules/network';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Injectable()
export class UserNavigationService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  getEditState(): UserEdit {
    return this.router.getCurrentNavigation()?.extras.state as UserEdit;
  }

  navigateToAdd() {
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.userRoutes.USER,
        NavigationRoutes.userRoutes.USER_ADD,
      ])
      .then(() => true);
  }

  navigateToEdit(element: UserItem) {
    const navigationExtras: NavigationExtras = {
      state: element,
    };
    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.userRoutes.USER,
          NavigationRoutes.userRoutes.USER_EDIT,
        ],
        navigationExtras
      )
      .then(() => true);
  }

  navigateToList() {
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.userRoutes.USER,
      ])
      .then(() => true);
  }
}
