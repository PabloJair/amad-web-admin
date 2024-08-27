import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-elements-badge-green',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge-green.component.html',
  styleUrl: './badge-green.component.scss',
})
export class BadgeGreenComponent {
  text = input("");

}
