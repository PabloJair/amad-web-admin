import { Actions } from './actions';
import { Properties } from './properties';

export interface ComponentEntity{
  UUID:string,
  type:TypeComponent;
  properties:Properties
  actions?:Actions
}
export enum TypeComponent{
  IMAGE,
  BUTTON,
  TEXT,
  CARROUSEL,
  DIALOG,
  UNKNOWN

}


export const defaultComponentEntity:ComponentEntity = {
  UUID: "",
  type:TypeComponent.UNKNOWN,
  properties:{
    text:"",
    margin:{
      top:0,
      bottom:0,
      left:0,
      right:0
    }
  },
  actions: {
    call:"",
    openWebView:"",
    openSections:"",
    showBySchedule:[]

  }
}