import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentEntity } from '../../../entities/component-entity';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ItemCarousel } from '../../../entities/properties';
import {
  FileUploadComponent,
  FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { getBase64 } from '@amad-web-admin/modules/core';
import { v4 as uuidv4 } from 'uuid';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-carousel-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    FileUploadListItemComponent,
    MatButtonModule,
  ],
  templateUrl: './carousel-properties.component.html',
  styleUrl: './carousel-properties.component.scss',
})
export class CarouselPropertiesComponent {
  constructor() {
    this.fileImageCarrousel.valueChanges.subscribe((files) => {
      if (files.length > 0) {
        getBase64(files[0], (value) => {
          this.add({
            id: uuidv4(),
            title: files[0].name,
            src: value,
          });
          this.fileImageCarrousel.removeFile(files[0]);
        });
      }
    });
  }

  componentEntity = input<ComponentEntity>(defaultComponentEntity);
  public readonly fileImageCarrousel = new FileUploadControl(
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

  add(item: ItemCarousel) {
    this.componentEntity().properties.itemCarousel?.push(item);
  }

  delete(item: ItemCarousel) {
    this.componentEntity().properties.itemCarousel =
      this.componentEntity().properties.itemCarousel?.filter(
        (value) => value.id != item.id
      );
  }
}
