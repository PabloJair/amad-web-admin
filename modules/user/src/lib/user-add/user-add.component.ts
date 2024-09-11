import { AfterViewInit, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
  ButtonLoaderComponent,
  DialogService,
} from '@amad-web-admin/modules/ui-elements';
import {
  FileUploadComponent,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
} from '@iplab/ngx-file-upload';
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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AutoUnsubscribe,
  CommonsStrings,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { UserNavigationService } from '../commons/user-navigation.service';
import { UsersFacade } from '../+state/user.facade';
import { StatusRol, UserStatus } from '@amad-web-admin/modules/network';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';

@AutoUnsubscribe
@Component({
  selector: 'lib-user-add',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ButtonLoaderComponent,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
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
    MatSelectModule,
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent implements AfterViewInit {
  protected loading$ = signal(false);

  private successAddUser$$?: Subscription = undefined;
  private error$$?: Subscription = undefined;
  private loading$$?: Subscription = undefined;

  constructor(
    public navigation: UserNavigationService,
    protected userFacade: UsersFacade,
    protected dialogService: DialogService
  ) {
    this.successAddUser$$ = userFacade.successAddUser$.subscribe((value) => {
      this.loading$.set(false);
      this.navigation.navigateToList();
    });
    this.loading$$ = this.userFacade.loaded$.subscribe((value) =>
      this.loading$.set(value)
    );

    this.error$$ = this.userFacade.error$.subscribe((value) => {
      this.dialogService.showError(
        CommonsStrings.ERROR_GENERIC_TITLE,
        value.message
      );
    });

    console.log();
  }

  ngAfterViewInit(): void {
    this.userFacade.getListRol({ status: StatusRol.ENABLED });
    this.userFacade.loaded$.subscribe((value) => this.loading$.set(value));
  }

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
      name: 'Nuevo Usuario',
    },
  ];

  addUserForm = new FormGroup({
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
    nombre: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: [Validators.required],
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

  add() {
    this.userFacade.addUser(this.addUserForm.getRawValue());
  }
}
