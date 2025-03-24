import { Actions } from './actions';
import { Properties } from './properties';
import { TypeComponent } from './type-component';

export interface ComponentEntity {
  UUID: string;
  type: TypeComponent;
  properties: Properties;
  actions: Actions;
}
