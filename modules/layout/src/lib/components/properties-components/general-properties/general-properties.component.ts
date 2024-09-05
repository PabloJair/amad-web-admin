import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentEntity, TypeComponent } from '../../../entities/component-entity';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-general-properties',
  standalone: true,
  imports: [CommonModule, MatExpansionModule,
    MatIconModule,
    MatLabel,
    MatFormField,
    MatSlider,
    MatInput,
    CdkTextareaAutosize,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton, MatSliderThumb],
  templateUrl: './general-properties.component.html',
  styleUrl: './general-properties.component.scss'
})
export class GeneralPropertiesComponent {
  protected readonly TypeComponent = TypeComponent;
  componentEntity = input<ComponentEntity>(defaultComponentEntity);

  changeText(event: Event) {
    this.componentEntity().properties.text = (event.target as HTMLInputElement).value;
  }

  changeFonSize(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.componentEntity().properties.fontSize = Number(filterValue);
  }

  changeCornerRadius($event: number) {
    this.componentEntity().properties.cornerRadius = $event;

  }

  changeTextAlignment(event: MatRadioChange) {
    console.log(event);
    this.componentEntity().properties.textAlignment = event.value;

  }

}
