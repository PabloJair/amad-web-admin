import { Route } from '@angular/router';
import { ModulesLayoutComponent } from './modules-layout/modules-layout.component';

import { PreviewComponent } from './preview/preview.component';

export const modulesLayoutRoutes: Route[] = [
  { path: '', component: ModulesLayoutComponent,

    children: [
      {
        path: '',
        component: PreviewComponent,
      },
  ]
  }

];
