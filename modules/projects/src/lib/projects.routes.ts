import { Route } from '@angular/router';
import { ModulesProjectsComponent } from './modules-projects/modules-projects.component';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsFacade } from './+state/projects.facade';
import { ProjectsEffects } from './+state/projects.effects';
import * as fromProjectRedux from './+state/projects.reducer';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectNavigationService } from './commons/project-navigation.service';
import { ProjectEditComponent } from './project-edit/project-edit.component';

export const modulesProjectsRoutes: Route[] = [
  {
    path: '',
    component: ModulesProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectsListComponent,
      },
      {
        path: NavigationRoutes.projects.PROJECT_LIST,
        component: ProjectsListComponent,
      },
      {
        path: `${NavigationRoutes.projects.PROJECT_ADD}`,
        component: ProjectAddComponent,
      },
      {
        path: `${NavigationRoutes.projects.PROJECT_EDIT}`,
        component: ProjectEditComponent,
      },
    ],
    providers: [
      ProjectsFacade,
      ProjectNavigationService,
      provideEffects([ProjectsEffects]),
      provideState(fromProjectRedux.projectFeature),
    ],
  },
];
