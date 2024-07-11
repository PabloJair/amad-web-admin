import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-modules-core',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modules-core.component.html',
  styleUrl: './modules-core.component.scss',
})
export class ModulesCoreComponent {}
