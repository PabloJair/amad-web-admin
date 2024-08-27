import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-modules-projects',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './modules-projects.component.html',
  styleUrl: './modules-projects.component.scss',
})
export class ModulesProjectsComponent {}
