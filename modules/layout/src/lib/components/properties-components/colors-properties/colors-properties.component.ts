import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ComponentEntity } from '@amad-web-admin/shared';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defaultComponentEntity } from '../../../entities/defaults-components';

@Component({
  selector: 'lib-colors-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './colors-properties.component.html',
  styleUrl: './colors-properties.component.scss',
})
export class ColorsPropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity());
}
