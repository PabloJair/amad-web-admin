import { Route } from '@angular/router';
import { ModulesProjectsComponent } from './modules-projects/modules-projects.component';
import { NavigationRoutes } from '@amad-web-admin/modules/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsFacade } from './+state/projects.facade';
import { ProjectsEffects } from './+state/projects.effects';
import * as fromProjectRedux from './+state/projects.reducer';
import * as fromSepomexRedux from './+state/sepomex/sepomex.reducer';

import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectNavigationService } from './commons/project-navigation.service';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectPreconfigurationComponent } from './project-preconfiguration/project-preconfiguration.component';
import { ProjectInformationDataComponent } from './project-information-data/project-information-data.component';
import { SepomexEffect } from './+state/sepomex/sepomex.effect';
import { SepomexFacade } from './+state/sepomex/sepomex.facade';

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
        path: `${NavigationRoutes.projects.PROJECT_CONFIGURATIONS}`,
        component: ProjectPreconfigurationComponent,
      },
      {
        path: `${NavigationRoutes.projects.PROJECT_EDIT}`,
        component: ProjectEditComponent,
      },
      {
        path: `${NavigationRoutes.projects.PROJECT_PERSONAL_INFORMATION}`,
        component: ProjectInformationDataComponent,
      },
    ],
    providers: [
      ProjectsFacade,
      ProjectNavigationService,
      SepomexFacade,
      provideEffects([ProjectsEffects, SepomexEffect]),
      provideState(fromProjectRedux.projectFeature),
      provideState(fromSepomexRedux.sepomexFeature),
    ],
  },
];
