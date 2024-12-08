import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ComponentEntity,
  TypeComponent,
} from '../../../entities/component-entity';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import {
  MatRadioButton,
  MatRadioChange,
  MatRadioGroup,
} from '@angular/material/radio';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-general-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatLabel,
    MatFormField,
    MatSlider,
    MatInput,
    CdkTextareaAutosize,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatSliderThumb,
    FormsModule,
  ],
  templateUrl: './general-properties.component.html',
  styleUrl: './general-properties.component.scss',
})
export class GeneralPropertiesComponent {
  protected readonly TypeComponent = TypeComponent;
  componentEntity = input<ComponentEntity>(defaultComponentEntity);
}
