import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-modules-companies',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './modules-companies.component.html',
  styleUrl: './modules-companies.component.scss',
})
export class ModulesCompaniesComponent {}
