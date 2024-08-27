import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-elements-badge-basic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge-basic.component.html',
  styleUrl: './badge-basic.component.scss',
})
export class BadgeBasicComponent {
  text = input("");

}
