import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ComponentEntity } from '@amad-web-admin/modules/layout';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-margin-size-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    FormsModule,
  ],
  templateUrl: './margin-size-properties.component.html',
  styleUrl: './margin-size-properties.component.scss',
})
export class MarginSizePropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity);

  changeWidth(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.componentEntity().properties.size.width = Number(filterValue);
  }

  changeHeight(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.componentEntity().properties.size.height = Number(filterValue);
  }
}
