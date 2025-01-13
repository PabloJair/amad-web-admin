import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {
  FileUploadComponent,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
} from '@iplab/ngx-file-upload';
import { MatButtonModule } from '@angular/material/button';
import { ComponentEntity } from '@amad-web-admin/modules/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
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
