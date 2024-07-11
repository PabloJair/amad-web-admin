import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-page-404',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButton],
  templateUrl: './page-404.component.html',
  styleUrl: './page-404.component.scss',
})
export class Page404Component {}
