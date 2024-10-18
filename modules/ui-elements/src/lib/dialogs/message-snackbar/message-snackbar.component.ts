import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ui-elements-message-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatButton,
    MatSnackBarAction,
  ],
  templateUrl: './message-snackbar.component.html',
  styleUrl: './message-snackbar.component.scss',
})
export class MessageSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string },
    protected snackBarRef: MatSnackBarRef<MessageSnackbarComponent>
  ) {}
}
