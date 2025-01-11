import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FileUploadComponent,
  FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { CommonsStrings, getBase64 } from '@amad-web-admin/modules/core';
import {
  ComponentEntity,
  TypeComponent,
} from '../../../entities/component-entity';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { MatExpansionModule } from '@angular/material/expansion';
import { UploadService } from '@amad-web-admin/modules/network';
import { v4 as uuidv4 } from 'uuid';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploadComponent } from '@amad-web-admin/modules/ui-elements';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { PositionAlignment } from '@amad-web-admin/modules/layout';

@Component({
  selector: 'lib-image-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    ImageUploadComponent,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './image-properties.component.html',
  styleUrl: './image-properties.component.scss',
})
export class ImagePropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity);

  loader = false;

  constructor(protected uploadImage: UploadService) {}

  onFileSelected($event: File[]) {
    this.loader = true;
    if ($event.length > 0) {
      this.loader = false;
      this.uploadImage.uploadFile($event[0]).subscribe((value) => {
        this.componentEntity().properties.base64Image = value.data;
      });
    }
  }

  protected readonly PositionAlignment = PositionAlignment;
  protected readonly TypeComponent = TypeComponent;
}
