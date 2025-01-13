import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentEntity } from '@amad-web-admin/modules/layout';
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
import { v4 as uuidv4 } from 'uuid';
import { MatButtonModule } from '@angular/material/button';
import { UploadService } from '@amad-web-admin/modules/network';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { defaultComponentEntity } from '../../../entities/defaults-components';

@Component({
  selector: 'lib-carousel-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    FileUploadComponent,
    FileUploadDropZoneComponent,
    MatButtonModule,
    MatProgressSpinner,
  ],
  templateUrl: './carousel-properties.component.html',
  styleUrl: './carousel-properties.component.scss',
})
export class CarouselPropertiesComponent {
  loader = signal<boolean>(false);

  constructor(protected uploadImage: UploadService) {
    this.fileImageCarrousel.valueChanges.subscribe((files) => {
      this.loader.set(true);
      if (files.length > 0) {
        this.uploadImage.uploadFile(files[0]).subscribe((value) => {
          this.loader.set(false);

          this.add({
            id: uuidv4(),
            title: files[0].name,
            src: value.data,
          });
          this.fileImageCarrousel.removeFile(files[0]);
        });
      }
    });
  }

  componentEntity = input<ComponentEntity>(defaultComponentEntity());
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
