import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogLayoutComponent, ResultType } from '@amad-web-admin/modules/ui-elements';
import { NgOtpInputModule } from 'ng-otp-input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-dialog-code-google',
  standalone: true,
  imports: [ReactiveFormsModule, DialogLayoutComponent, NgOtpInputModule],
  templateUrl: './dialog-code-google.component.html',
  styleUrl: './dialog-code-google.component.scss',
})
export class DialogCodeGoogleComponent {
  LENGTH_CODE = 6;

  constructor(
    protected dialogRef: MatDialogRef<DialogCodeGoogleComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: string
  ) {}

  onCodeChange($event: string) {
    if ($event.length == this.LENGTH_CODE) {
      this.dialogRef.close({
        resultType: ResultType.SUCCESS,
        data: { googleCode: $event },
      });
    }
  }

  protected readonly ResultType = ResultType;
}
