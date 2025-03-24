import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsersFacade } from '../+state/user.facade';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AutoUnsubscribe } from '@amad-web-admin/modules/core';
import {
  BadgeGreenComponent,
  BadgeRedComponent,
  BreadcrumbComponent,
  BreadcrumbItem,
  DialogService,
  ResultType,
} from '@amad-web-admin/modules/ui-elements';
import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { UserNavigationService } from '../commons/user-navigation.service';
import { listBreadcrumbItems } from '../commons/brandcrumb-user';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { StatusRol, UserItem, UserRolItem, UserStatus } from '@amad-web-admin/shared';

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
    NgxSpinnerComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
@AutoUnsubscribe
export class UserListComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['userID', 'user', 'email', 'username', 'rol', 'status', 'action'];
  dataSource = new MatTableDataSource<UserItem>([]);
  protected readonly UserStatus = UserStatus;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  private listUser$$?: Subscription;
  private loaded$$?: Subscription;
  private listRol$$?: Subscription;
  protected userRolItem: UserRolItem[] = [];
  protected breadcrumbItems: BreadcrumbItem[] = listBreadcrumbItems;

  constructor(
    public userFacade: UsersFacade,
    public navigation: UserNavigationService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {
    this.userFacade.reset();
    this.listUser$$ = this.userFacade.listUser$.subscribe((value) => {
      this.dataSource.data = value;
      this.userFacade.getListRol({
        status: StatusRol.ENABLED,
      });
    });
    this.listRol$$ = this.userFacade.listRol$.subscribe((value) => {
      this.userRolItem = value;
    });
    this.loaded$$ = this.userFacade.loaded$.subscribe((value) =>
      value ? spinner.show() : spinner.hide()
    );
  }

  getNameRol(idRol: number): string {
    const foundItem = this.userRolItem.find((item) => item.id_rol === idRol);
    return foundItem ? foundItem.desc_rol : 'Desconocido';
  }

  changeUserRol(userStatus: UserStatus) {
    this.userFacade.getListUsers({ status: userStatus });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.changeUserRol(UserStatus.ENABLE);
  }

  ngOnDestroy(): void {
    this.listUser$$?.unsubscribe();
    this.loaded$$?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(element: UserItem) {
    this.dialogService
      .showWarning(
        `¿Desea eliminar al usuario ${element.nombre}?`,
        'Advertencia',
        'Aceptar',
        'Cancelar'
      )
      .subscribe((value) => {
        value.resultType == ResultType.BUTTON_TWO ? this.userFacade.deleteUser(element) : null;
      });
  }
}
