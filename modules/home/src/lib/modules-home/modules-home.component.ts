import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AdministrationDialogBottomSheetComponent } from '../administration-dialog-bottom-sheet/administration-dialog-bottom-sheet.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRipple, MatIcon],
  templateUrl: './modules-home.component.html',
  styleUrl: './modules-home.component.scss',
})
export class ModulesHomeComponent {
  items: MenuItems[] = [
    {
      icon: 'admin_panel_settings',
      title: 'Administración',
      description: 'Gestiona la configuración de usuarios, roles, etc..',
      tag: 'ADMIN',
    },
    {
      icon: 'category',
      title: 'Compañias',
      description: 'Gestion la información de compañias.',
      tag: 'CATALOGS',
    },
    {
      icon: 'inventory_2',
      title: 'Proyectos',
      description:
        'Gestiona o administra la información de los proyectos agregados a una compañia',
      tag: 'PROYECTS',
    },
  ];

  goTo(item: MenuItems) {
    switch (item.tag) {
      case 'ADMIN':
        this._bottomSheet.open(AdministrationDialogBottomSheetComponent);
        break;
      case 'CATALOGS':
        this.router.navigate([
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.company.COMPANY,
        ]);
        break;
      case 'PROYECTS':
        this.router.navigate([
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.projects.PROJECT,
        ]);
        break;
      case 'LAYOUT':
        this.router.navigate([
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.layout.HOME,
        ]);
        break;
    }
  }

  constructor(
    private readonly router: Router,
    private _bottomSheet: MatBottomSheet
  ) {}
}

interface MenuItems {
  icon: string;
  title: string;
  description: string;
  tag: 'ADMIN' | 'CATALOGS' | 'PROYECTS' | 'LAYOUT';
}
