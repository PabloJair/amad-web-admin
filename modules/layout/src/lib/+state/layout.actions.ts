import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UpdateJsonProjectLayout } from '@amad-web-admin/shared';

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
    fail: props<{ error: unknown }>(),
    load: props<{ value: boolean }>(),
    reset: emptyProps(),
  },
});
