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
import {
  AutoUnsubscribe,
  CommonsStrings,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { CompanyFacade } from '../+state/company.facade';
import { CompaniesNavigationService } from '../commons/companies-navigation.service';
import { Subscription } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';

@AutoUnsubscribe
@Component({
  selector: 'lib-company-add',
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
    NgxMaskDirective,
  ],
  templateUrl: './company-add.component.html',
  styleUrl: './company-add.component.scss',
})
export class CompanyAddComponent {
  private successAddRol$$?: Subscription = undefined;
  private error$$?: Subscription = undefined;
  private loading$$?: Subscription = undefined;
  protected loading$ = signal(false);

  constructor(
    public facade: CompanyFacade,
    protected navigate: CompaniesNavigationService,
    protected dialogService: DialogService
  ) {
    this.successAddRol$$ = this.facade.success$.subscribe((value) => {
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
      name: 'Nuevo compañia',
    },
  ];

  addCompanyForm = new FormGroup({
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
    status: new FormControl<number>(1, {
      nonNullable: true,
      validators: Validators.required,
    }),
    nombre: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  add() {
    this.facade.addCompany(this.addCompanyForm.getRawValue());
  }
}
