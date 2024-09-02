import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { DialogService } from '@amad-web-admin/modules/ui-elements';
import { DialogScheduleComponent } from '../dialog-schedule/dialog-schedule.component';
import { getDayForNumber, ShowBySchedule } from '../entities/actions';
import { defaultComponentEntity, getViewNameTypeComponent } from '../entities/compontents-utils';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import {
  FileUploadComponent,
  FileUploadControl,
  FileUploadDropZoneComponent,
  FileUploadListItemComponent, FileUploadValidators
} from '@iplab/ngx-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { getBase64 } from '../../../../core/src/lib/utils/file.utils';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
  selector: 'lib-properties',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDivider,
    MatExpansionModule,
    MatIconModule, MatCheckbox, MatRadioGroup, MatRadioButton, FileUploadComponent, FileUploadDropZoneComponent, FileUploadListItemComponent, ReactiveFormsModule, MatSlider, MatSliderThumb],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity);
  updateComponentEntity = output<ComponentEntity>();
  showProperties = input(false);
  delete = output<string>();
  public readonly fileUploadControl = new FileUploadControl(
    {
      listVisible: true,
      accept: [CommonsStrings.MIME_TYPE_PNG, CommonsStrings.MIME_TYPE_JPG],
      discardInvalid: true,
      multiple: false
    },
    [FileUploadValidators.accept([CommonsStrings.MIME_TYPE_PNG, CommonsStrings.MIME_TYPE_JPG]), FileUploadValidators.filesLimit(1)]
  );

  constructor(private dialogService: DialogService) {

    this.fileUploadControl.valueChanges.subscribe(files => {
      if (files.length > 0) {
        getBase64(files[0], value => {
          this.updateComponentEntity.emit(this.updateProperty('base64Image',
            value)());
        });
      }


    });
  }


  private updateProperty(name: string, value: any) {

    const newComponent = computed(() => this.componentEntity());
    newComponent().properties = ({
      ...newComponent().properties,
      [name]: value
    });
    return newComponent;
  }


  changeText(event: Event) {
    this.updateComponentEntity.emit(this.updateProperty('text', (event.target as HTMLInputElement).value)());

  }

  changeBackground(event: Event) {
    this.updateComponentEntity.emit(this.updateProperty('background', (event.target as HTMLInputElement).value)());

  }

  changeColor(event: Event) {
    this.updateComponentEntity.emit(this.updateProperty('colorText', (event.target as HTMLInputElement).value)());
  }

  changeFonSize(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateComponentEntity.emit(this.updateProperty('fontSize', Number(filterValue))());
  }

  changeTextAlignment(event: MatRadioChange) {
    console.log(event);
    this.updateComponentEntity.emit(this.updateProperty('textAlignment', event.value)());

  }

  updateShowBySchedule(addShowBySchedule: ShowBySchedule) {
    const newComponent = computed(() => this.componentEntity());

    const actions = newComponent().actions ?? {
      showBySchedule: []
    };

    newComponent().actions = actions;
    actions.showBySchedule?.push(addShowBySchedule);
    this.updateComponentEntity.emit(newComponent());

  }

  changeWidth(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties = ({
      ...newComponent().properties,
      size: {
        width: Number(filterValue),
        height: newComponent().properties.size?.height ?? 60

      }
    });
    this.updateComponentEntity.emit(newComponent());

  }

  changeHeight(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties = ({
      ...newComponent().properties,
      size: {
        height: Number(filterValue),
        width: newComponent().properties.size?.width ?? 40
      }
    });
    this.updateComponentEntity.emit(newComponent());
  }

  changeCornerRadius($event: number) {
    this.updateComponentEntity.emit(this.updateProperty('cornerRadius', $event)());

  }

  openDialogDate() {
    this.dialogService.openAnyDialog(DialogScheduleComponent)
      .subscribe(value => {
          this.updateShowBySchedule(value);
          console.log(this.componentEntity());
        }
      );
  }

  protected readonly getDayForNumber = getDayForNumber;
  protected readonly getViewNameTypeComponent = getViewNameTypeComponent;


  protected readonly TypeComponent = TypeComponent;
}
