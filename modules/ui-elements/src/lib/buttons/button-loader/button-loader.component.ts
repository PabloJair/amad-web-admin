import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ui-elements-button-loader',
  standalone: true,
  imports: [CommonModule, MatButton, MatProgressSpinnerModule,MatIconModule],
  templateUrl: './button-loader.component.html',
  styleUrl: './button-loader.component.scss',
})
export class ButtonLoaderComponent {

  disabled = input(false)
  showLoader = input(false)
  text = input("")


}
