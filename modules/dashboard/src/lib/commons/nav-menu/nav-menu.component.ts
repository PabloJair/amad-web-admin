import { Component } from '@angular/core';
import { MatListItemIcon } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { DialogService } from '@amad-web-admin/modules/ui-elements';
import {
  AuthenticationInformationService,
  CommonsStrings,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { RouterLink } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dashboard-nav-menu',
  standalone: true,
  imports: [MatIcon, MatListItemIcon, MatDivider, MatIconButton, NgClass, MatRipple, RouterLink],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  menus = [
    {
      title: 'Home',
      icon: 'home',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      title: 'Usuarios',
      icon: 'group',
      link: `${NavigationRoutes.userRoutes.USER}`,
    },
    {
      title: 'Roles',
      icon: 'supervisor_account',
      link: `${NavigationRoutes.rolesAndPermission.ROLES}`,
    },
    {
      title: 'Compañias',
      icon: 'apartment',
      link: `${NavigationRoutes.company.COMPANY}`,
    },
    {
      title: 'Proyectos',
      icon: 'inventory_2',
      link: `${NavigationRoutes.projects.PROJECT}`,
    },
  ];
  isOpenMenu = true;

  constructor(
    private dialogService: DialogService,
    private authenticationInformationService: AuthenticationInformationService
  ) {}

  closeSession() {
    this.dialogService
      .showWarning('¿Deseas cerrar sesión?', '', CommonsStrings.ACCEPT, CommonsStrings.CANCEL)
      .subscribe((value) => {
        this.authenticationInformationService.deleteSession();
        window.location.reload();
      });
  }
}
