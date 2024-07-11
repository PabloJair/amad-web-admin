import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-modules-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './modules-user.component.html',
  styleUrl: './modules-user.component.scss',
})
export class ModulesUserComponent {}
