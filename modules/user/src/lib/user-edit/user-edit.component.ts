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
  UserEdit,
  UserRolItem,
  UserStatus,
} from '@amad-web-admin/modules/network';

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
export class UserEditComponent implements AfterViewInit {
  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Usuarios',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.userRoutes.USER}`,
    },
    {
      color: 'text-yellow-600',
      name: 'Editar Usuario',
    },
  ];

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
    estatus: new FormControl<number>(1, {
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
    this.userItem = this.navigation.getEditState();
  }

  private setupUser() {
    if (this.userItem == undefined) {
      this.dialogService
        .showError(
          CommonsStrings.ERROR_GENERIC_TITLE,
          'Error al cargar el usuario'
        )
        .subscribe((value) => {
          this.navigation.navigateToList();
        });
      return;
    }
    this.editUserForm.controls.user.setValue(this.userItem.user);
    this.editUserForm.controls.nombre.setValue(this.userItem.nombre);
    this.editUserForm.controls.email.setValue(this.userItem.email);
    this.editUserForm.controls.a_materno.setValue(this.userItem.a_materno);
    this.editUserForm.controls.a_paterno.setValue(this.userItem.a_paterno);
    this.editUserForm.controls.estatus.setValue(this.userItem.estatus);
    this.editUserForm.controls.proyectos.setValue(this.userItem.proyectos);
    this.editUserForm.controls.rol.setValue(this.userItem.rol);
  }

  ngAfterViewInit(): void {
    this.userFacade.getListRol({ status: UserStatus.ENABLE });
    this.successListRol$$ = this.userFacade.listRol$.subscribe((value) => {
      this.listRol$.set(value);
      this.setupUser();
    });
    this.userFacade.loaded$.subscribe((value) => this.loading$.set(value));
    this.successEditUser$$ = this.userFacade.successAddUser$.subscribe(
      (value) => {
        this.dialogService
          .showWarning(
            'Atención',
            'Usuario guardado correctamente ',
            'Regresar',
            'Continuar'
          )
          .subscribe((value1) => {
            if (value1.resultType == ResultType.BUTTON_ONE) {
              this.navigation.navigateToList();
            }
          });
        this.loading$.set(false);
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
      estatus: this.editUserForm.controls.estatus.value
        ? UserStatus.ENABLE
        : UserStatus.ENABLE,
      rol: this.editUserForm.controls.rol.value,
      proyectos: [],
      id_usuario: this.userItem.id_usuario,
    };

    this.userFacade.editUser(user, this.userItem.id_usuario);
  }
}
