import { AfterViewInit, Component, signal } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { CompanyFacade } from '../+state/company.facade';
import { CompaniesNavigationService } from '../commons/companies-navigation.service';
import {
  AutoUnsubscribe,
  CommonsStrings,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import {
  CompanyItem,
  EditCompany,
  ProjectStatus,
} from '@amad-web-admin/modules/network';
import { CompanyStatus } from '../../../../network/src/lib/companies/entities/company-status';

@AutoUnsubscribe
@Component({
  selector: 'lib-company-edit',
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
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent implements AfterViewInit {
  private successEditRol$$?: Subscription = undefined;
  private error$$?: Subscription = undefined;
  private loading$$?: Subscription = undefined;
  protected loading$ = signal(false);
  protected companyItem: CompanyItem;

  constructor(
    public facade: CompanyFacade,
    protected navigate: CompaniesNavigationService,
    protected dialogService: DialogService
  ) {
    this.companyItem = navigate.getEditCompany();
    this.setup();
  }

  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Compañias',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}/${NavigationRoutes.company.COMPANY_ADD}`,
    },
    {
      color: 'text-yellow-600',
      name: 'Editar compañia',
    },
  ];

  editCompanyForm = new FormGroup({
    contacto: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    nombre_comercial: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    telefono: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required,
    }),
    status: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: Validators.required,
    }),
    nombre: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  edit() {
    const item: EditCompany = {
      contacto: this.editCompanyForm.controls.contacto.value,
      nombre: this.editCompanyForm.controls.nombre.value,
      nombre_comercial: this.editCompanyForm.controls.nombre_comercial.value,
      status: this.editCompanyForm.controls.status.value
        ? CompanyStatus.ACTIVE
        : CompanyStatus.DISABLE,
      telefono: this.editCompanyForm.controls.telefono.value,
    };

    this.facade.editCompany(item, this.companyItem.id_cia);
  }

  private setup() {
    if (this.companyItem == undefined) {
      this.dialogService
        .showError(CommonsStrings.ERROR_GENERIC_TITLE, 'Error al cargar el Rol')
        .subscribe((value) => {
          this.navigate.navigateToList();
        });
      return;
    }
    this.editCompanyForm.controls.status.setValue(
      this.companyItem.status == ProjectStatus.ACTIVE
    );
    this.editCompanyForm.controls.nombre.setValue(this.companyItem.nombre);
    this.editCompanyForm.controls.nombre_comercial.setValue(
      this.companyItem.nombre_comercial
    );
    this.editCompanyForm.controls.contacto.setValue(this.companyItem.contacto);
    this.editCompanyForm.controls.telefono.setValue(this.companyItem.telefono);
  }

  ngAfterViewInit(): void {
    this.successEditRol$$ = this.facade.success$.subscribe((value) => {
      this.loading$.set(false);
      this.navigate.navigateToList();
    });

    this.loading$$ = this.facade.loaded$.subscribe((value) =>
      this.loading$.set(value)
    );

    this.error$$ = this.facade.error$.subscribe((value) => {
      this.dialogService.showError(
        CommonsStrings.ERROR_GENERIC_TITLE,
        value.message
      );
    });
  }
}
