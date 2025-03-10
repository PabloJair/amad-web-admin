import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListItemIcon, MatListModule } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatLine } from '@angular/material/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';

@Component({
  selector: 'lib-administration-dialog-bottom-sheet',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatLine],
  templateUrl: './administration-dialog-bottom-sheet.component.html',
  styleUrl: './administration-dialog-bottom-sheet.component.scss',
})
export class AdministrationDialogBottomSheetComponent {
  items: ItemAdministration[] = [
    {
      name: 'Usuarios',
      description: 'Información sobre los usuarios registrados',
      Tag: 'USER',
    },
    {
      name: 'Roles',
      description: 'Información sobre los roles registrados',
      Tag: 'ROLES',
    },
  ];

  goTo(item: ItemAdministration) {
    this._bottomSheetRef.dismiss();

    switch (item.Tag) {
      case 'ROLES':
        this.router.navigate([
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.rolesAndPermission.ROLES,
        ]);
        break;
      case 'USER':
        this.router.navigate([
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.userRoutes.USER,
        ]);
        break;
    }
  }

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AdministrationDialogBottomSheetComponent>,
    private readonly router: Router
  ) {}
}

interface ItemAdministration {
  name: string;
  description: string;
  Tag: 'ROLES' | 'USER';
}
