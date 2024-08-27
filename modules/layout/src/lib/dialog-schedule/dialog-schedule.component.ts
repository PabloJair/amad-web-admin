import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatTimepickerComponent, NgxMatTimepickerDirective } from 'ngx-mat-timepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { CommonsStrings } from '@amad-web-admin/modules/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-dialog-schedule',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, NgxMatTimepickerComponent, NgxMatTimepickerDirective, MatButton, ReactiveFormsModule, MatSlideToggle],
  templateUrl: './dialog-schedule.component.html',
  styleUrl: './dialog-schedule.component.scss',
})
export class DialogScheduleComponent {

  readonly dialogRef = inject(MatDialogRef<DialogScheduleComponent>);

  dateTimeFormControl= new FormGroup({
    dayStart: new FormControl<"1"|"2"|"3"|"4"|"5"|"6"|"7">("1", {
      nonNullable: true,
      validators: Validators.required
    }),
    dayEnd: new FormControl<"1"|"2"|"3"|"4"|"5"|"6"|"7">("1", {
      nonNullable: true,
      validators: Validators.required
    }),
    hourEnd: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required
    }),
    hourStart: new FormControl<string>(CommonsStrings.EMPTY_STRING, {
      nonNullable: true,
      validators: Validators.required
    }),
    show: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: Validators.required
    })
  })


days = [
  {value:"1" ,label:'Lunes' },
  {value:"2" ,label:'Martes' },
  {value:"3" ,label:'Miercoles' },
  {value:"4" ,label:'Jueves' },
  {value:"5" ,label:'Viernes' },
  {value:"6" ,label:'Sabado' },
  {value:"7" ,label:'Domingo' }];

  add() {
    console.log(this.dateTimeFormControl.getRawValue())

    this.dialogRef.close(this.dateTimeFormControl.getRawValue())
  }
}
