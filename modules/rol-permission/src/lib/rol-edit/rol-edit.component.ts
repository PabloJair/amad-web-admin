import { AfterViewInit, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
  DialogService,
  ResultType,
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
import { AutoUnsubscribe, CommonsStrings } from '@amad-web-admin/modules/core';
import { Subscription } from 'rxjs';
import { RolesAndPermissionFacade } from '../+store/roles-and-permission.facade';
import { RolPermissionNavigationService } from '../commons/rol-permission-navigation.service';
import {
  EditUserRol,
  StatusRol,
  UserRolItem,
  UserRolStatus,
} from '@amad-web-admin/modules/network';
import { editBreadcrumb } from '../commons/breadcrumb-rol';

@AutoUnsubscribe
@Component({
  selector: 'lib-rol-edit',
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
  templateUrl: './rol-edit.component.html',
  styleUrl: './rol-edit.component.scss',
})
export class RolEditComponent implements AfterViewInit {
  private successAddRol$$?: Subscription = undefined;
  private error$$?: Subscription = undefined;
  private loading$$?: Subscription = undefined;
  private readonly userRolItem!: UserRolItem;
  protected loading$ = signal(false);

  constructor(
    protected dialogService: DialogService,
    protected rolesAndPermissionFacade: RolesAndPermissionFacade,
    protected navigation: RolPermissionNavigationService
  ) {
    this.userRolItem = this.navigation.getEditRolPermissionFromLocalStorage();
  }

  ngAfterViewInit(): void {
    this.rolesAndPermissionFacade.loaded$.subscribe((value) =>
      this.loading$.set(value)
    );

    this.error$$ = this.rolesAndPermissionFacade.error$.subscribe((value) => {
      this.dialogService.showError(
        CommonsStrings.ERROR_GENERIC_TITLE,
        value.message
      );
    });

    this.successAddRol$$ = this.rolesAndPermissionFacade.successRol$.subscribe(
      (value) => {
        this.dialogService
          .showSuccess('Atención', 'Rol actualizado correctamente ')
          .subscribe((value1) => {
            if (value1.resultType == ResultType.BUTTON_ONE) {
              this.navigation.navigateToList();
            }
          });
        this.loading$.set(false);
      }
    );
    this.setup();
  }

  protected breadcrumbItems: BreadcrumbItem[] = editBreadcrumb();

  editRolForm = new FormGroup({
    desc_rol: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    status: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: Validators.required,
    }),
    desc_larga: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private setup() {
    this.editRolForm.controls.status.setValue(
      this.userRolItem.status == UserRolStatus.ACTIVE
    );
    this.editRolForm.controls.desc_rol.setValue(this.userRolItem.desc_rol);
    this.editRolForm.controls.desc_larga.setValue(this.userRolItem.desc_larga);
  }

  edit() {
    const item: EditUserRol = {
      desc_larga: this.editRolForm.controls.desc_larga.value,
      desc_rol: this.editRolForm.controls.desc_rol.value,
      status: this.editRolForm.controls.status.value
        ? StatusRol.ENABLED
        : StatusRol.DISABLED,
    };
    this.navigation.setEditRolPermission({
      id_rol: this.userRolItem.id_rol,
      status: this.editRolForm.controls.status.value
        ? UserRolStatus.ACTIVE
        : UserRolStatus.DISABLE,
      desc_rol: item.desc_larga,
      desc_larga: item.desc_larga,
    });
    this.rolesAndPermissionFacade.editUser(item, this.userRolItem.id_rol);
  }
}
