import { Actions } from './actions';
import { Properties } from './properties';

export interface ComponentEntity {
  UUID: string;
  type: TypeComponent;
  properties: Properties;
  actions: Actions;
}

export enum TypeComponent {
  IMAGE,
  BUTTON,
  IMAGE_BUTTON,
  TEXT,
  CARROUSEL,
  DIALOG,
  UNKNOWN,
}
