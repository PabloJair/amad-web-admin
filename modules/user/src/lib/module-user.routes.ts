import { Route } from '@angular/router';
import { ModulesUserComponent } from './modules-user/modules-user.component';
import { UsersFacade } from './+state/user.facade';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './+state/user.effects';
import { provideState } from '@ngrx/store';
import * as fromUserRedux from './+state/user.reducer';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { UserListComponent } from './user-list/user-list.component';

export const modulesUserRoutes: Route[] = [
  {
    path: '',
    component: ModulesUserComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: NavigationRoutes.userRoutes.USER_LIST,
        component: UserListComponent,
      },
    ],
    providers: [
      UsersFacade,
      provideEffects([UserEffects]),
      provideState(fromUserRedux.userFeature),
    ],
  },
];
