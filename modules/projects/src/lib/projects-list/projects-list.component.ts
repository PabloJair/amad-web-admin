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
import { MatIconButton } from '@angular/material/button';
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
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import {
  AutoUnsubscribe,
  CommonsStrings,
  defaultEmptyOrNull,
  NavigationRoutes,
} from '@amad-web-admin/modules/core';
import { CompanyItem, ProjectStatus } from '@amad-web-admin/modules/network';
import { Subscription } from 'rxjs';
import { ProjectsFacade } from '../+state/projects.facade';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ProjectViewComponent } from '../project-view/project-view.component';
import { CompanyStatus } from '../../../../network/src/lib/companies/entities/company-status';

@AutoUnsubscribe
@Component({
  standalone: true,
  imports: [
    CommonModule,
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
    MatNoDataRow,
    BadgeGreenComponent,
    BadgeRedComponent,
  ],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss',
})
export class ProjectsListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  private listUser$$?: Subscription;
  private loaded$$?: Subscription;

  constructor(
    public projectFacade: ProjectsFacade,
    private _bottomSheet: MatBottomSheet,
    private dialog: DialogService
  ) {
    this.projectFacade.reset();
    this.listUser$$ = this.projectFacade.listCompanies$.subscribe((value) => {
      this.dataSource.data = value;
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
      name: 'Proyectos',
    },
    {
      color: 'text-red-600',
      name: 'Lista de proyectos',
    },
  ];
  displayedColumns: string[] = [
    'companyID',
    'companyName',
    'companyCommerceName',
    'phone',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<CompanyItem>([]);

  ngAfterViewInit() {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.changeStatusProject(CompanyStatus.ACTIVE);
  }

  changeStatusProject(companyStatus: CompanyStatus) {
    this.projectFacade.getListCompanies({
      nombre_comercial: '',
      status: companyStatus,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected readonly ProjectStatus = ProjectStatus;
  protected readonly defaultEmptyOrNull = defaultEmptyOrNull;

  viewProject(companyItem: CompanyItem) {
    this._bottomSheet.open(ProjectViewComponent, {
      data: companyItem,
    });
  }

  changeStatus(item: CompanyItem) {
    this.dialog.showWarning(
      'Atención',
      `¿Deseas cambiar el estatus de ${item.nombre_comercial}?`,
      CommonsStrings.ACCEPT,
      CommonsStrings.CANCEL
    );
  }

  protected readonly CompanyStatus = CompanyStatus;
}
