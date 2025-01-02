import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
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
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  AutoUnsubscribe,
  CommonsStrings,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { UserNavigationService } from '../commons/user-navigation.service';
import { UsersFacade } from '../+state/user.facade';
import { Subscription } from 'rxjs';
import {
  StatusRol,
  UserEdit,
  UserRolItem,
  UserStatus,
} from '@amad-web-admin/modules/network';
import { editBreadcrumb } from '../commons/brandcrumb-user';

@AutoUnsubscribe
@Component({
  selector: 'lib-user-edit',
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
    MatOption,
    MatSelect,
    MatSlideToggle,
    ReactiveFormsModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements AfterViewInit, OnDestroy {
  protected breadcrumbItems = editBreadcrumb;

  protected loading$ = signal(false);
  protected listRol$ = signal<UserRolItem[]>([]);

  private successEditUser$$?: Subscription = undefined;
  private error$$?: Subscription = undefined;
  private loading$$?: Subscription = undefined;
  protected successListRol$$?: Subscription;
  private readonly userItem!: UserEdit;

  editUserForm = new FormGroup({
    nombre: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    a_materno: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    a_paterno: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),

    password: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [],
    }),
    rol: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    estatus: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    user: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    proyectos: new FormControl<number[]>([], {
      nonNullable: true,
    }),
  });

  constructor(
    public navigation: UserNavigationService,
    protected userFacade: UsersFacade,
    protected dialogService: DialogService
  ) {
    this.userItem = this.navigation.getUserCache();
  }

  ngOnDestroy(): void {
    this.userFacade.reset();
  }

  private setupUser() {
    this.editUserForm.controls.user.setValue(this.userItem.user);
    this.editUserForm.controls.nombre.setValue(this.userItem.nombre);
    this.editUserForm.controls.email.setValue(this.userItem.email);
    this.editUserForm.controls.a_materno.setValue(this.userItem.a_materno);
    this.editUserForm.controls.a_paterno.setValue(this.userItem.a_paterno);
    this.editUserForm.controls.estatus.setValue(
      this.userItem.status == UserStatus.ENABLE
    );
    this.editUserForm.controls.proyectos.setValue(this.userItem.proyectos);
    this.editUserForm.controls.rol.setValue(this.userItem.rol);
  }

  ngAfterViewInit(): void {
    this.userFacade.getListRol({ status: StatusRol.ENABLED });
    this.successListRol$$ = this.userFacade.listRol$.subscribe((value) => {
      this.listRol$.set(value);
      this.setupUser();
    });
    this.userFacade.loaded$.subscribe((value) => this.loading$.set(value));
    this.successEditUser$$ = this.userFacade.successAddUser$.subscribe(
      (value) => {
        if (value) {
          this.dialogService.showSuccess(
            'Atención',
            'Usuario actualizado correctamente '
          );
          this.loading$.set(false);
        }
      }
    );
  }

  edit() {
    const user: UserEdit = {
      user: this.editUserForm.controls.user.value,
      nombre: this.editUserForm.controls.nombre.value,
      email: this.editUserForm.controls.email.value,
      a_materno: this.editUserForm.controls.a_materno.value,
      a_paterno: this.editUserForm.controls.a_paterno.value,
      status: this.editUserForm.controls.estatus.value
        ? UserStatus.ENABLE
        : UserStatus.DISABLE,
      rol: this.editUserForm.controls.rol.value,
      proyectos: [],
      id_usuario: this.userItem.id_usuario,
    };
    this.userFacade.editUser(user, this.userItem.id_usuario);
  }
}
