import { Component, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  copyArrayItem,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import { MatButton } from '@angular/material/button';
import { ButtonComponent } from '../components/button/button.component';

@Component({
  selector: 'lib-preview-mobile',
  standalone: true,
  imports: [CommonModule, CdkDrag, NgOptimizedImage, CdkDropList, MatButton, ButtonComponent],
  templateUrl: './preview-mobile.component.html',
  styleUrl: './preview-mobile.component.scss'
})
export class PreviewMobileComponent {
  componentEntitiesAdd: ComponentEntity[] = [];

  onSelectedComponent = output<ComponentEntity>();


  drop(event: CdkDragDrop<ComponentEntity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public addNewComponent(typeComponent: TypeComponent): void {
    this.componentEntitiesAdd.push(
      {
        type: typeComponent,
        properties: {},
        UUID: ''
      }
    );
  }


  protected readonly TypeComponent = TypeComponent;

  showProperties(item: ComponentEntity) {

    this.onSelectedComponent.emit(item);
  }
}
