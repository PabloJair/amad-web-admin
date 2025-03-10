import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeBasicComponent } from '../badges/badge-basic/badge-basic.component';

@Component({
  selector: 'ui-elements-breadcrumb',
  standalone: true,
  imports: [RouterLink, BadgeBasicComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  @Input()
  breadcrumbItems: BreadcrumbItem[] = [];
}

export interface BreadcrumbItem {
  name: string;
  link?: string;
  color: string;
}
