import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
  DialogService,
} from '@amad-web-admin/modules/ui-elements';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AutoUnsubscribe, CommonsStrings, NavigationRoutes } from '@amad-web-admin/modules/core';
import { Subscription } from 'rxjs';
import { RolesAndPermissionFacade } from '../+store/roles-and-permission.facade';
import { RolPermissionNavigationService } from '../commons/rol-permission-navigation.service';
import { AddUserRol } from '@amad-web-admin/shared';

@AutoUnsubscribe
@Component({
  selector: 'lib-rol-add',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonLoaderComponent,
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle,
    ReactiveFormsModule,
  ],
  templateUrl: './rol-add.component.html',
  styleUrl: './rol-add.component.scss',
})
export class RolAddComponent {
  private successAddRol$$?: Subscription = undefined;
  private error$$?: Subscription = undefined;
  private loading$$?: Subscription = undefined;
  protected loading$ = signal(false);

  constructor(
    protected dialogService: DialogService,
    protected rolesAndPermissionFacade: RolesAndPermissionFacade,
    protected navigation: RolPermissionNavigationService
  ) {
    this.successAddRol$$ = rolesAndPermissionFacade.successRol$.subscribe(() => {
      this.loading$.set(false);
      this.navigation.navigateToList();
    });
    this.loading$$ = this.rolesAndPermissionFacade.loaded$.subscribe((value) =>
      this.loading$.set(value)
    );

    this.error$$ = this.rolesAndPermissionFacade.error$.subscribe((value) => {
      this.dialogService.showError(CommonsStrings.ERROR_GENERIC_TITLE, value.message);
    });
  }

  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Rol',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.rolesAndPermission.ROLES_LIST}`,
    },
    {
      color: 'text-yellow-600',
      name: 'Nuevo Rol',
    },
  ];

  addRolForm = new FormGroup({
    desc_rol: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    status: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    desc_larga: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  add() {
    this.rolesAndPermissionFacade.addUser(this.addRolForm.getRawValue() as unknown as AddUserRol);
  }
}
