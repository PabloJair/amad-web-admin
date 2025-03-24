import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { CompanyItem } from '@amad-web-admin/shared';

@Injectable()
export class CompaniesNavigationService {
  constructor(private readonly router: Router) {}

  getEditCompany(): CompanyItem {
    return this.router.getCurrentNavigation()?.extras.state as CompanyItem;
  }

  navigateToEdit(companyItem: CompanyItem) {
    const navigationExtras: NavigationExtras = {
      state: companyItem,
    };

    this.router
      .navigate(
        [
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.company.COMPANY,
          NavigationRoutes.company.COMPANY_EDIT,
        ],
        navigationExtras
      )
      .then(() => true);
  }

  navigateToList() {
    this.router
      .navigate([NavigationRoutes.dashboard.DASHBOARD, NavigationRoutes.company.COMPANY])
      .then(() => true);
  }
}
