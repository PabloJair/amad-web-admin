import { Actions } from './actions';
import { Properties } from './properties';
import { CommonsUI } from '@amad-web-admin/modules/core';

export interface ComponentEntity {
  UUID: string,
  type: TypeComponent;
  properties: Properties
  actions?: Actions
}

export enum TypeComponent {
  IMAGE,
  BUTTON,
  TEXT,
  CARROUSEL,
  DIALOG,
  UNKNOWN

}


export const defaultComponentEntity: ComponentEntity = {
  UUID: '',
  type: TypeComponent.UNKNOWN,
  properties: {
    text: '',
    size: {
      width: CommonsUI.BUTTON_MIN_W,
      height: CommonsUI.BUTTON_MIN_H
    },
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  },
  actions: {
    call: '',
    openWebView: '',
    openSections: '',
    showBySchedule: []

  }
};