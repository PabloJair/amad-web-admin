import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-elements-badge-warning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge-warning.component.html',
  styleUrl: './badge-warning.component.scss',
})
export class BadgeWarningComponent {
  text = input("");

}
