import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-modules-rol-permission',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './modules-rol-permission.component.html',
  styleUrl: './modules-rol-permission.component.scss',
})
export class ModulesRolPermissionComponent {}
