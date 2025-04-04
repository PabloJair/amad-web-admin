import { AfterViewInit, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FilesAcceptDirective,
  FileUploadComponent,
  FileUploadControl,
  FileUploadValidators,
} from '@iplab/ngx-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'ui-elements-upload',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatProgressSpinner,
    FilesAcceptDirective,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent implements AfterViewInit {
  fileSelected = output<File[]>();
  loader = input<boolean>(false);
  urlFile = input<string>();
  acceptFiles = input<string[]>([
    CommonsStrings.MIME_TYPE_JPG,
    CommonsStrings.MIME_TYPE_JPEG,
    CommonsStrings.MIME_TYPE_PNG,
  ]);
  public fileUploadControl = new FileUploadControl(
    {
      listVisible: false,
      native: false,
      accept: this.acceptFiles(),
      discardInvalid: false,
      multiple: false,
    },
    [
      FileUploadValidators.accept(this.acceptFiles()),
      FileUploadValidators.filesLimit(1),
    ]
  );

  constructor() {
    this.fileUploadControl.valueChanges.subscribe((value) => {
      if (value.length > 0) {
        this.fileSelected.emit(value);
        this.convertFileToImage(value[0]);
        console.log(value);
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.acceptFiles());
    this.fileUploadControl.acceptFiles(this.acceptFiles().join('|'));
  }

  convertFileToImage(file: File) {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.urlFile();
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    }).then((r) => console.log(r));
  }
}
