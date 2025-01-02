import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BadgeGreenComponent,
  BadgeRedComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  DialogService,
  ResultType,
} from '@amad-web-admin/modules/ui-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import {
  AutoUnsubscribe,
  CommonsStrings,
  defaultEmptyOrNull,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { CompanyItem } from '@amad-web-admin/modules/network';
import { Subscription } from 'rxjs';
import { CompanyStatus } from '@amad-web-admin/modules/network';
import { CompanyFacade } from '../+state/company.facade';
import { RouterLink } from '@angular/router';
import { CompaniesNavigationService } from '../commons/companies-navigation.service';
import { companyResponseAction } from '../+state/company.actions';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'lib-company-list',
  standalone: true,
  imports: [
    CommonModule,
    BadgeGreenComponent,
    BadgeRedComponent,
    BreadcrumbComponent,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatChipListbox,
    MatChipOption,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatTooltip,
    ReactiveFormsModule,
    MatHeaderCellDef,
    MatAnchor,
    RouterLink,
    MatNoDataRow,
    NgxSpinnerComponent,
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
@AutoUnsubscribe
export class CompanyListComponent implements AfterViewInit {
  private listCompany$$?: Subscription;
  private loaded$$?: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Compañias',
    },
    {
      color: 'text-red-600',
      name: 'Lista de compañias',
    },
  ];

  ngAfterViewInit() {
    this.dataSource.paginator = <MatPaginator>this.paginator;

    this.changeTypeCompany(CompanyStatus.ACTIVE);
  }

  displayedColumns: string[] = [
    'companyID',
    'companyName',
    'companyCommerceName',
    'phone',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<CompanyItem>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeStatus(item: CompanyItem) {
    console.log(item.id_cia);
    this.dialog
      .showWarning(
        'Atención',
        `¿Deseas cambiar el estatus de ${item.nombre_comercial}?`,
        CommonsStrings.ACCEPT,
        CommonsStrings.CANCEL
      )
      .subscribe((value) => {
        if (value.resultType == ResultType.BUTTON_TWO) {
          this.companyFacade.delete(item.id_cia);
        }
      });
  }

  constructor(
    public companyFacade: CompanyFacade,
    private dialog: DialogService,
    protected navigation: CompaniesNavigationService,
    private spinner: NgxSpinnerService
  ) {
    this.companyFacade.reset();

    this.listCompany$$ = this.companyFacade.listCompanies$.subscribe(
      (value) => {
        this.dataSource.data = value;
      }
    );
    this.loaded$$ = this.companyFacade.loaded$.subscribe((value) => {
      if (value) {
        this.spinner.show().then();
      } else {
        this.spinner.hide().then();
      }
    });
    this.companyFacade.error$.subscribe((value) => {
      if (value) {
        this.dialog.showError(
          'Atención',
          `Error al desactivar la compañia`,
          CommonsStrings.ACCEPT
        );
      }
    });

    this.companyFacade.success$.subscribe((value) => {
      if (value == companyResponseAction.successDelete) {
        this.changeTypeCompany(CompanyStatus.ACTIVE);
      }
    });
  }

  protected changeTypeCompany(status: CompanyStatus) {
    this.companyFacade.getListCompanies({
      status,
    });
  }

  protected readonly defaultEmptyOrNull = defaultEmptyOrNull;
  protected readonly CompanyStatus = CompanyStatus;

  edit(element: CompanyItem) {
    this.navigation.navigateToEdit(element);
  }
}
