export interface DialogResult {
  resultType: ResultType;
  data: any;
}
export enum ResultType {
  BUTTON_ONE = 'button_one',
  BUTTON_TWO = 'button_two',
  NONE = 'none',
  SUCCESS = 'success',
  CANCEL = 'cancel',
}
