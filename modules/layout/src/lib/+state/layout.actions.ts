import { UpdateJsonProjectLayout } from '@amad-web-admin/modules/network';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const layoutRequestAction = createActionGroup({
  source: 'module-layout-request',
  events: {
    updateJsonProject: props<{ value: UpdateJsonProjectLayout; id: string }>(),
  },
});

export const layoutResponseAction = createActionGroup({
  source: 'module-users-response',
  events: {
    successUpdateJsonProject: props<{ value: string }>(),
  },
});

export const layoutAppAction = createActionGroup({
  source: 'module-users',
  events: {
    fail: props<{ error: any }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
