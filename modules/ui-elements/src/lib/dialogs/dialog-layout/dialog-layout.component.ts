import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'dialog-layout',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogActions],
  templateUrl: './dialog-layout.component.html',
  styleUrl: './dialog-layout.component.scss',
})
export class DialogLayoutComponent {}
