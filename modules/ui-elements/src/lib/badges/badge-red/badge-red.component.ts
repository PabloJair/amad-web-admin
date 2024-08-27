import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-elements-badge-red',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge-red.component.html',
  styleUrl: './badge-red.component.scss',
})
export class BadgeRedComponent {
  text = input("");

}
