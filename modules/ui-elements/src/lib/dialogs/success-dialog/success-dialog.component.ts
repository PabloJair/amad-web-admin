import { Component, Inject } from '@angular/core';
import {
  DialogLayoutComponent,
  DialogResult,
  DialogsEntity,
  ResultType,
} from '@amad-web-admin/modules/ui-elements';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ui-elements-success-dialog',
  standalone: true,
  imports: [DialogLayoutComponent, MatButton],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss',
})
export class SuccessDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogsEntity,
    private dialogRef: MatDialogRef<SuccessDialogComponent>
  ) {}

  buttonOne() {
    this.dialogRef.close({
      resultType: ResultType.BUTTON_ONE,
      data: null,
    } as DialogResult);
  }
}
