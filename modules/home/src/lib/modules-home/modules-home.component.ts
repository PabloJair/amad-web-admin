import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatRipple, MatIcon],
  templateUrl: './modules-home.component.html',
  styleUrl: './modules-home.component.scss',
})
export class ModulesHomeComponent {
  items = [
    {
      icon: 'admin_panel_settings',
      title: 'Administración',
      description: 'Gestiona la configuración de usuarios, roles, etc..',
    },
    {
      icon: 'category',
      title: 'Catalogos',
      description: 'Gestion la información de conpañias.',
    },
    {
      icon: 'inventory_2',
      title: 'Proyectos',
      description:
        'Gestiona o administra la informacion de los proyectos agregados a una compañia',
    },
    {
      icon: 'palette',
      title: 'Maquetador',
      description: 'Editor  de interfas grafica para generar ',
    },
  ];
}
