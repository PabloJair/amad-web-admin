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
import { DialogScheduleComponent } from '../../../dialog-schedule/dialog-schedule.component';
import { DialogService } from '@amad-web-admin/modules/ui-elements';
import { MatSelectModule } from '@angular/material/select';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defaultComponentEntity } from '../../../entities/defaults-components';
import { NgxMaskDirective } from 'ngx-mask';

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
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './actions-properties.component.html',
  styleUrl: './actions-properties.component.scss',
})
export class ActionsPropertiesComponent {
  protected readonly getDayForNumber = getDayForNumber;
  protected readonly TypeComponent = TypeComponent;

  componentEntity = input<ComponentEntity>(defaultComponentEntity());

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
        if (value) {
          this.updateShowBySchedule(value);
        }
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
  }

  checkedOpenCall($event: MatCheckboxChange) {
    this.openSection.checked = false;
    this.openUrl.checked = false;
    this.openCall.checked = $event.checked;
    this.inputUrl.value = CommonsStrings.EMPTY_STRING;
    this.inputCall.value = CommonsStrings.EMPTY_STRING;
  }

  changeCall($event: Event) {
    this.componentEntity().actions.openSections = '';
    this.componentEntity().actions.call = (
      $event.target as HTMLInputElement
    ).value;
    this.componentEntity().actions.openWebView = CommonsStrings.EMPTY_STRING;
  }
}
