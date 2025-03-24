import { ComponentEntity, Properties } from '@amad-web-admin/shared';

export interface View {
  id: string;
  nameView: string;
  mainView: boolean;
  properties?: Properties | null;
  component: ComponentEntity[];
}
