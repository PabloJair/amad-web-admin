import { Route } from '@angular/router';
import { ModulesLayoutComponent } from './modules-layout/modules-layout.component';

import { PreviewComponent } from './preview/preview.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromLayoutRedux from './+state/layout.reducer';
import { LayoutEffects } from './+state/layout.effects';
import { LayoutFacade } from './+state/layout.facade';

export const modulesLayoutRoutes: Route[] = [
  {
    path: '',
    component: ModulesLayoutComponent,

    children: [
      {
        path: '',
        component: PreviewComponent,
      },
    ],
    providers: [
      LayoutFacade,
      provideEffects([LayoutEffects]),
      provideState(fromLayoutRedux.layoutFeature),
    ],
  },
];
