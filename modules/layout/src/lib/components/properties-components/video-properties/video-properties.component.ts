import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '@amad-web-admin/modules/ui-elements';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentEntity, TypeComponent } from '@amad-web-admin/modules/layout';
import { defaultComponentEntity } from '../../../entities/defaults-components';
import { NgxMaskDirective } from 'ngx-mask';
import { UploadService } from '@amad-web-admin/modules/network';
import { CommonsStrings } from '@amad-web-admin/modules/core';

@Component({
  selector: 'lib-video-properties',
  standalone: true,
  imports: [
    CommonModule,
    ImageUploadComponent,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './video-properties.component.html',
  styleUrl: './video-properties.component.scss',
})
export class VideoPropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity());
  protected readonly TypeComponent = TypeComponent;

  loader = false;
  patterns = {
    A: { pattern: /[a-zA-Z0-9]/ }, // Solo permite caracteres alfanuméricos para los primeros caracteres de la URL.
    '*': { pattern: /[a-zA-Z0-9.-_/?:&%#=@~]/ }, // Permite caracteres comunes en URLs.
  };

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

  public addhttp = (value: string | number | undefined | null): string => {
    return `https://${value}`;
  };
  protected readonly CommonsStrings = CommonsStrings;
}
