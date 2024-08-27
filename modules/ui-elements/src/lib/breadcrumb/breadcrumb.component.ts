import { Component, Input } from '@angular/core';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { BadgeBasicComponent } from '../badges/badge-basic/badge-basic.component';

@Component({
  selector: 'ui-elements-breadcrumb',
  standalone: true,
  imports: [MatChipSet, MatChip, RouterLink, MatCard, MatCardHeader, BadgeBasicComponent],
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
