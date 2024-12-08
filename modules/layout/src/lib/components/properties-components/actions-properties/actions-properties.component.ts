import { Component, computed, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDayForNumber, ShowBySchedule } from '../../../entities/actions';
import { ComponentEntity, TypeComponent } from '@amad-web-admin/modules/layout';
import { MatButton } from '@angular/material/button';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { defaultComponentEntity } from '../../../entities/compontents-utils';
import { DialogScheduleComponent } from '../../../dialog-schedule/dialog-schedule.component';
import { DialogService } from '@amad-web-admin/modules/ui-elements';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-actions-properties',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatCheckbox,
    MatDivider,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './actions-properties.component.html',
  styleUrl: './actions-properties.component.scss',
})
export class ActionsPropertiesComponent {
  protected readonly getDayForNumber = getDayForNumber;
  protected readonly TypeComponent = TypeComponent;

  componentEntity = input<ComponentEntity>(defaultComponentEntity);

  sections = input<{ name: string; id: string }[]>();

  @ViewChild('section') openSection!: MatCheckbox;
  @ViewChild('call') openCall!: MatCheckbox;
  @ViewChild('url') openUrl!: MatCheckbox;

  @ViewChild('inputUrl') inputUrl!: MatInput;
  @ViewChild('inputCall') inputCall!: MatInput;

  constructor(private dialogService: DialogService) {}

  openDialogDate() {
    this.dialogService
      .openAnyDialog(DialogScheduleComponent)
      .subscribe((value) => {
        this.updateShowBySchedule(value);
        console.log(this.componentEntity());
      });
  }

  updateShowBySchedule(addShowBySchedule: ShowBySchedule) {
    if (this.componentEntity().actions?.showBySchedule == undefined) {
      this.componentEntity().actions = {
        call: '',
        openSections: '',
        openWebView: '',
        showBySchedule: [],
      };
    }
    console.log(addShowBySchedule);
    this.componentEntity().actions?.showBySchedule.push(addShowBySchedule);
    console.log(this.componentEntity().actions?.showBySchedule);
  }

  checkedSection($event: MatCheckboxChange) {
    this.openUrl.checked = false;
    this.openCall.checked = false;
    this.openSection.checked = $event.checked;

    this.inputUrl.value = CommonsStrings.EMPTY_STRING;
    this.inputCall.value = CommonsStrings.EMPTY_STRING;
  }

  checkedOpenUrl($event: MatCheckboxChange) {
    this.openCall.checked = false;
    this.openSection.checked = false;
    this.openUrl.checked = $event.checked;
    this.inputUrl.value = CommonsStrings.EMPTY_STRING;
    this.inputCall.value = CommonsStrings.EMPTY_STRING;
  }

  checkedOpenCall($event: MatCheckboxChange) {
    this.openSection.checked = false;
    this.openUrl.checked = false;
    this.openCall.checked = $event.checked;
    this.inputUrl.value = CommonsStrings.EMPTY_STRING;
    this.inputCall.value = CommonsStrings.EMPTY_STRING;
  }

  changeUrlText($event: Event) {
    this.componentEntity().actions.openWebView = (
      $event.target as HTMLInputElement
    ).value;
    this.componentEntity().actions.openSections = CommonsStrings.EMPTY_STRING;
    this.componentEntity().actions.call = CommonsStrings.EMPTY_STRING;
  }

  selectedSection($event: string) {
    this.componentEntity().actions.openSections = $event;
    this.componentEntity().actions.call = CommonsStrings.EMPTY_STRING;
    this.componentEntity().actions.openWebView = CommonsStrings.EMPTY_STRING;
  }

  changeCall($event: Event) {
    this.componentEntity().actions.openSections = '';
    this.componentEntity().actions.call = (
      $event.target as HTMLInputElement
    ).value;
    this.componentEntity().actions.openWebView = CommonsStrings.EMPTY_STRING;
  }
}
