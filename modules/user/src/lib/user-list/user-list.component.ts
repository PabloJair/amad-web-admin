import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { UserItem, UserStatus } from '@amad-web-admin/modules/network';
import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsersFacade } from '../+state/user.facade';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import {
  BreadcrumbComponent,
  BreadcrumbItem,
} from '@amad-web-admin/modules/ui-elements';
import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-user-list',
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
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'userID',
    'user',
    'email',
    'username',
    'rol',
    'status',
    'action',
  ];
  selection = new SelectionModel<UserItem>(true, []);
  dataSource = new MatTableDataSource<UserItem>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  private listUser$$?: Subscription;
  private loaded$$?: Subscription;
  protected breadcrumbItems: BreadcrumbItem[] = [
    {
      color: 'text-blue-600',
      name: 'Dashboard',
      link: `/${NavigationRoutes.dashboard.DASHBOARD}`,
    },
    {
      color: 'text-blue-600',
      name: 'Usuarios',
    },
    {
      color: 'text-red-600',
      name: 'Lista de usuarios',
    },
  ];
  constructor(public userFacade: UsersFacade) {
    this.userFacade.reset();
    this.listUser$$ = this.userFacade.listUser$.subscribe(value => {
      this.dataSource.data = value;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = <MatPaginator>this.paginator;

    this.userFacade.getListUsers({ status: UserStatus.ENABLE });
  }

  ngOnDestroy(): void {
    this.listUser$$?.unsubscribe();
    this.loaded$$?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  protected readonly UserStatus = UserStatus;
}
