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
import { ComponentEntity } from '../../../entities/component-entity';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { MatExpansionModule } from '@angular/material/expansion';
import { UploadService } from '@amad-web-admin/modules/network';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'lib-image-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
  ],
  templateUrl: './image-properties.component.html',
  styleUrl: './image-properties.component.scss',
})
export class ImagePropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity);

  public readonly fileUploadControl = new FileUploadControl(
    {
      listVisible: true,
      accept: [CommonsStrings.MIME_TYPE_PNG, CommonsStrings.MIME_TYPE_JPG],
      discardInvalid: true,
      multiple: false,
    },
    [
      FileUploadValidators.accept([
        CommonsStrings.MIME_TYPE_PNG,
        CommonsStrings.MIME_TYPE_JPG,
      ]),
      FileUploadValidators.filesLimit(1),
    ]
  );

  constructor(protected uploadImage: UploadService) {
    this.fileUploadControl.valueChanges.subscribe((files) => {
      if (files.length > 0) {
        this.uploadImage.uploadFile(files[0]).subscribe((value) => {
          this.componentEntity().properties.base64Image = value.data;
        });
      }
    });
  }
}
