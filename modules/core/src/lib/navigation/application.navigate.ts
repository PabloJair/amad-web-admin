import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationRoutes } from './application.routers';

@Injectable({
  providedIn: 'root',
})
export class ApplicationNavigate {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}
  navigateToAuthentication() {
    this.router
      .navigate([NavigationRoutes.authentication.AUTHENTICATION])
      .then(() => true);
  }
  navigateToDashboard() {
    this.router
      .navigate([NavigationRoutes.dashboard.DASHBOARD])
      .then(() => true);
  }
  navigateToLogout() {
    this.router
      .navigate([
        NavigationRoutes.authentication.AUTHENTICATION,
        NavigationRoutes.authentication.LOGOUT,
      ])
      .then(() => true);
  }


}
