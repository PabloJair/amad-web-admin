import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BadgeGreenComponent,
  BadgeRedComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  DialogService,
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
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import {
  CommonsStrings,
  defaultEmptyOrNull,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { CompanyItem } from '@amad-web-admin/modules/network';
import { ProjectsFacade } from '../../../../projects/src/lib/+state/projects.facade';
import { Subscription } from 'rxjs';
import { CompanyStatus } from '../../../../network/src/lib/companies/entities/company-status';
import { CompanyFacade } from '../+state/company.facade';

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
  ],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
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

    this.companyFacade.getListCompanies({
      nombre_comercial: '',
    });
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
    this.dialog.showWarning(
      'Atención',
      `¿Deseas cambiar el estatus de ${item.nombre_comercial}?`,
      CommonsStrings.ACCEPT,
      CommonsStrings.CANCEL
    );
  }

  constructor(
    public companyFacade: CompanyFacade,
    private dialog: DialogService
  ) {
    this.companyFacade.reset();
    this.listCompany$$ = this.companyFacade.listCompanies$.subscribe(
      (value) => {
        this.dataSource.data = value;
      }
    );
  }

  protected readonly defaultEmptyOrNull = defaultEmptyOrNull;
  protected readonly CompanyStatus = CompanyStatus;
}
