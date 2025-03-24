import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
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
      Tag: TypeAdministration.USER,
    },
    {
      name: 'Roles',
      description: 'Información sobre los roles registrados',
      Tag: TypeAdministration.ROLES,
    },
  ];

  async goTo(item: ItemAdministration) {
    this._bottomSheetRef.dismiss();

    switch (item.Tag) {
      case TypeAdministration.ROLES:
        await this.router.navigate([
          NavigationRoutes.dashboard.DASHBOARD,
          NavigationRoutes.rolesAndPermission.ROLES,
        ]);
        break;
      case TypeAdministration.USER:
        await this.router.navigate([
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
  Tag: TypeAdministration;
}

enum TypeAdministration {
  ROLES = 'ROLES',
  USER = 'USER',
}
