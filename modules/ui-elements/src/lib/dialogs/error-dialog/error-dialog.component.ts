import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogsEntity } from '../dialogs.entity';
import { DialogResult, ResultType } from '../dialog-result';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ui-elements-error-dialog',
  standalone: true,
  imports: [DialogLayoutComponent, MatButton],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogsEntity,
    private dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {}

  buttonOne() {
    this.dialogRef.close({
      resultType: ResultType.BUTTON_ONE,
    } as DialogResult);
  }

  buttonTwo() {
    this.dialogRef.close({
      resultType: ResultType.BUTTON_ONE,
    } as DialogResult);
  }
}
