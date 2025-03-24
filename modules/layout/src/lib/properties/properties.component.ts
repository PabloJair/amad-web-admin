import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentEntity, TypeComponent } from '@amad-web-admin/modules/network';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { getViewNameTypeComponent } from '../entities/compontents-utils';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselPropertiesComponent } from '../components/properties-components/carousel-properties/carousel-properties.component';
import { GeneralPropertiesComponent } from '../components/properties-components/general-properties/general-properties.component';
import { ColorsPropertiesComponent } from '../components/properties-components/colors-properties/colors-properties.component';
import { ImagePropertiesComponent } from '../components/properties-components/image-properties/image-properties.component';
import { MarginSizePropertiesComponent } from '../components/properties-components/margin-size-properties/margin-size-properties.component';
import { ActionsPropertiesComponent } from '../components/properties-components/actions-properties/actions-properties.component';
import { defaultComponentEntity } from '../entities/defaults-components';
import { VideoPropertiesComponent } from '../components/properties-components/video-properties/video-properties.component';

@Component({
  selector: 'lib-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    ReactiveFormsModule,
    CarouselPropertiesComponent,
    GeneralPropertiesComponent,
    ColorsPropertiesComponent,
    ImagePropertiesComponent,
    MarginSizePropertiesComponent,
    ActionsPropertiesComponent,
    VideoPropertiesComponent,
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity());
  updateComponentEntity = output<ComponentEntity>();
  showProperties = input(false);
  delete = output<string>();
  sections = input<{ name: string; id: string }[]>();

  protected readonly getViewNameTypeComponent = getViewNameTypeComponent;

  protected readonly TypeComponent = TypeComponent;
}
