import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { UserEdit, UserItem } from '@amad-web-admin/modules/network';
import { LocalStorageService } from 'angular-web-storage';

@Injectable()
export class UserNavigationService {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}

  private KEY_USER = 'KEY_USER';

  getEditState(): UserEdit {
    return this.router.getCurrentNavigation()?.extras.state as UserEdit;
  }

  clearUser(): void {
    this.localStorageService.remove(this.KEY_USER);
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

  setUserCache(element: UserItem): void {
    this.localStorageService.set(this.KEY_USER, element);
  }

  getUserCache(): UserEdit {
    return this.localStorageService.get(this.KEY_USER) as UserEdit;
  }

  navigateToEdit(element: UserItem) {
    this.setUserCache(element);
    this.router
      .navigate([
        NavigationRoutes.dashboard.DASHBOARD,
        NavigationRoutes.userRoutes.USER,
        NavigationRoutes.userRoutes.USER_EDIT,
      ])
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
