import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'ui-elements-loader-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './loader-snackbar.component.html',
  styleUrl: './loader-snackbar.component.scss',
})
export class LoaderSnackbarComponent {
  private _snackBar = inject(MatSnackBarRef);

  close() {
    this._snackBar.dismiss();
  }
}
