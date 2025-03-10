import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  input,
  ViewChild,
} from '@angular/core';
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
export class ActionsPropertiesComponent implements AfterViewInit {
  protected readonly getDayForNumber = getDayForNumber;
  protected readonly TypeComponent = TypeComponent;

  componentEntity = input<ComponentEntity>(defaultComponentEntity());

  sections = input<{ name: string; id: string }[]>();
  @ViewChild('inputUrl') inputUrl!: MatInput;
  @ViewChild('inputCall') inputCall!: MatInput;

  constructor(
    private dialogService: DialogService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    effect(() => {
      this.setupData();

      console.log('Cambio de ,', this.componentEntity());
    });
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
    console.log('Cambio de , Se llama de nuevo');
  }

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
    if (addShowBySchedule) {
      this.componentEntity().actions?.showBySchedule.push(addShowBySchedule);
    }
  }

  setupData() {
    setTimeout(() => {}, 0);
  }
}
