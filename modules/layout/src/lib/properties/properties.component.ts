import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentEntity, defaultComponentEntity } from '../entities/component-entity';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { DialogService } from '@amad-web-admin/modules/ui-elements';
import { DialogScheduleComponent } from '../dialog-schedule/dialog-schedule.component';
import { getDayForNumber } from '../entities/actions';

@Component({
  selector: 'lib-properties',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDivider,
    MatExpansionModule,
    MatIconModule, MatCheckbox],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  componentEntity = input<ComponentEntity>(defaultComponentEntity)
  updateComponentEntity = output<ComponentEntity>()
  constructor(private  dialogService:DialogService) {
  }

  private updateProperty(name:string, value:any){

    const newComponent = computed(() => this.componentEntity());
    newComponent().properties=({
      ...newComponent().properties,
      [name]: value
    })
    return newComponent
  }


  changeText(event: Event) {
    console.log(this.componentEntity())
    this.updateComponentEntity.emit( this.updateProperty("text",(event.target as HTMLInputElement).value)())

  }
  changeBackground(event: Event) {
    this.updateComponentEntity.emit( this.updateProperty("background",(event.target as HTMLInputElement).value)())

  }
  changeColor(event: Event) {
    this.updateComponentEntity.emit( this.updateProperty("colorText",(event.target as HTMLInputElement).value)())
  }
  changeFonSize(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateComponentEntity.emit( this.updateProperty("fontSize",Number(filterValue))())

  }
  changeWidth(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties=({
      ...newComponent().properties,
      size:{
        width:Number(filterValue),
        height:newComponent().properties.size?.height ?? 60

      }
    })
    this.updateComponentEntity.emit( newComponent())

  }
  changeHeight(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties=({
      ...newComponent().properties,
      size:{
        height:Number(filterValue),
        width:newComponent().properties.size?.width ?? 40
      }
    })
    this.updateComponentEntity.emit( newComponent())
  }
  changeMarginTop(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties=({
      ...newComponent().properties,
      margin:{
        top:Number(filterValue),
        bottom:newComponent().properties.margin?.bottom ?? 0,
        left:newComponent().properties.margin?.left ?? 0,
        right:newComponent().properties.margin?.right ?? 0
      }
    })
    this.updateComponentEntity.emit( newComponent())
  }

  changeMarginBottom(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties=({
      ...newComponent().properties,
      margin:{
        top:newComponent().properties.margin?.top ?? 0,
        bottom:Number(filterValue),
        left:newComponent().properties.margin?.left ?? 0,
        right:newComponent().properties.margin?.right ?? 0
      }
    })
    this.updateComponentEntity.emit( newComponent())
  }

  changeMarginLeft(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties=({
      ...newComponent().properties,
      margin:{
        top:newComponent().properties.margin?.top ?? 0,
        bottom:newComponent().properties.margin?.bottom ?? 0,
        left: Number(filterValue) ,
        right:newComponent().properties.margin?.right ?? 0
      }
    })
    this.updateComponentEntity.emit( newComponent())
  }
  changeMarginRight(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const newComponent = computed(() => this.componentEntity());

    newComponent().properties=({
      ...newComponent().properties,
      margin:{
        top:newComponent().properties.margin?.top ?? 0,
        bottom:newComponent().properties.margin?.bottom ?? 0,
        left:newComponent().properties.margin?.left ?? 0,
        right:Number(filterValue)
      }
    })
    this.updateComponentEntity.emit( newComponent())
  }

  openDialogDate() {
    this.dialogService.openAnyDialog(DialogScheduleComponent)
      .subscribe(value =>
        this.componentEntity().actions?.showBySchedule?.push(value)
      )
  }

  protected readonly getDayForNumber = getDayForNumber;
}
