import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-modules-authentication',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './modules-authentication.component.html',
  styleUrl: './modules-authentication.component.scss',
})
export class ModulesAuthenticationComponent {}
