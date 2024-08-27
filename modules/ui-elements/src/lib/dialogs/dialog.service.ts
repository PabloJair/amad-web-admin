import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { DialogsEntity } from './dialogs.entity';
import { ResultType } from './dialog-result';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private currentDialog: MatDialogRef<any> | null = null;

  constructor(private dialog: MatDialog) {}

  openAnyDialog<T, R = any>(
    component: ComponentType<T>,
    data?: any,
  ): Observable<R | undefined> {
    // Close the existing dialog if it exists
    if (this.currentDialog) {
      this.currentDialog.close();
    }

    // Open the new dialog
    this.currentDialog = this.dialog.open(component, {
      data: data,
    });
    this.currentDialog.afterClosed().subscribe(() => {
      this.currentDialog = null;
    });

    // Return the afterClosed observable
    return this.currentDialog.afterClosed();
  }
  openDialog<T, R = any>(
    component: ComponentType<T>,
    data?: DialogsEntity,
  ): Observable<R | undefined> {
    // Close the existing dialog if it exists
    if (this.currentDialog) {
      this.currentDialog.close();
    }

    // Open the new dialog
    this.currentDialog = this.dialog.open(component, {
      data: data,

    });
    this.currentDialog.afterClosed().subscribe(() => {
      this.currentDialog = null;
    });

    // Return the afterClosed observable
    return this.currentDialog.afterClosed();
  }
  showError<R = ResultType>(
    title: string,
    message: string,
    textButton = CommonsStrings.ACCEPT,
  ): Observable<R | undefined> {
    return this.openDialog(ErrorDialogComponent, {
      title,
      description: message,
      textFirstButton: textButton,
    });
  }
  showWarning<R = ResultType>(
    title: string,
    message: string,
    textButton = CommonsStrings.ACCEPT,
    textButton2 = CommonsStrings.CANCEL,
  ){
    return this.openDialog(WarningDialogComponent, {
      title,
      description: message,
      textFirstButton: textButton,
      textSecondButton: textButton2,
    });
  }
}
