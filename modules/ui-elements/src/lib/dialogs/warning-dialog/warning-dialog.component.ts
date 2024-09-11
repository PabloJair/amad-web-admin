import { Component, Inject } from '@angular/core';
import { DialogLayoutComponent } from '@amad-web-admin/modules/ui-elements';
import { DialogResult, ResultType } from '../dialog-result';
import { DialogsEntity } from '../dialogs.entity';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ui-elements-warning-dialog',
  standalone: true,
  imports: [DialogLayoutComponent, MatButton],
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.scss',
})
export class WarningDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogsEntity,
    private dialogRef: MatDialogRef<WarningDialogComponent>
  ) {}

  buttonOne() {
    this.dialogRef.close({
      resultType: ResultType.BUTTON_ONE,
      data: null,
    } as DialogResult);
  }

  buttonTwo() {
    this.dialogRef.close({
      resultType: ResultType.BUTTON_TWO,
      data: null,
    } as DialogResult);
  }
}
