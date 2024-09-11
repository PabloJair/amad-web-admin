import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  BadgeGreenComponent,
  BadgeRedComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
} from '@amad-web-admin/modules/ui-elements';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  StatusRol,
  UserRolItem,
  UserRolStatus,
} from '@amad-web-admin/modules/network';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { RolesAndPermissionFacade } from '../+store/roles-and-permission.facade';
import { Subscription } from 'rxjs';
import { RolPermissionNavigationService } from '../commons/rol-permission-navigation.service';
import { CompanyStatus } from '../../../../network/src/lib/companies/entities/company-status';

@Component({
  selector: 'lib-rol-list',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    NgIf,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipListbox,
    MatChipOption,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    BadgeGreenComponent,
    BadgeRedComponent,
  ],
  templateUrl: './rol-list.component.html',
  styleUrl: './rol-list.component.scss',
})
export class RolListComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<UserRolItem>([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'status',
    'action',
  ];
  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Roles y permisos',
    },
    {
      color: 'text-red-600',
      name: 'Lista de roles y permisos',
    },
  ];
  private listRolUser$$: Subscription;
  private loaded$$: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private rolesAndPermissionsFacade: RolesAndPermissionFacade,
    protected navigation: RolPermissionNavigationService
  ) {
    this.listRolUser$$ = this.rolesAndPermissionsFacade.listRol$.subscribe(
      (value) => {
        this.dataSource.data = value;
      }
    );

    this.loaded$$ = this.rolesAndPermissionsFacade.loaded$.subscribe(
      (value) => {
        if (value) {
        } else {
        }
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: UserRolItem) {
    this.navigation.navigateToEdit(element);
  }

  delete(element: UserRolItem) {}

  showStatus(number: number) {
    this.rolesAndPermissionsFacade.getListRolesUsers({ status: number });
  }

  ngOnDestroy(): void {
    this.loaded$$.unsubscribe();
    this.listRolUser$$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.rolesAndPermissionsFacade.getListRolesUsers({
      status: StatusRol.ENABLED,
    });
  }

  protected readonly UserRolStatus = UserRolStatus;
  protected readonly StatusRol = StatusRol;
  protected readonly CompanyStatus = CompanyStatus;
}
