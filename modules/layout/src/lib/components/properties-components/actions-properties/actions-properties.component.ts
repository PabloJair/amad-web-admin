import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDayForNumber, ShowBySchedule } from '../../../entities/actions';
import {
  ComponentEntity,
  TypeComponent,
} from '../../../entities/component-entity';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
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
  ],
  templateUrl: './actions-properties.component.html',
  styleUrl: './actions-properties.component.scss',
})
export class ActionsPropertiesComponent {
  protected readonly getDayForNumber = getDayForNumber;
  protected readonly TypeComponent = TypeComponent;

  componentEntity = input<ComponentEntity>(defaultComponentEntity);

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
    this.componentEntity().actions?.showBySchedule.push(addShowBySchedule);
  }
}
