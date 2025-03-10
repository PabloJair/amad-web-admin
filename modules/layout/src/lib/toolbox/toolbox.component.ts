import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import {
  componentsToolBox,
  getViewIconTypeComponent,
  getViewNameTypeComponent,
} from '../entities/compontents-utils';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-toolbox',
  standalone: true,
  imports: [CommonModule, CdkDropList, MatIcon],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.scss',
})
export class ToolboxComponent {
  onAddComponent = output<TypeComponent>();

  componentEntities: ComponentEntity[] = componentsToolBox;
  protected readonly getViewNameTypeComponent = getViewNameTypeComponent;

  addComponent(typeComponent: TypeComponent) {
    this.onAddComponent.emit(typeComponent);
  }

  protected readonly getViewIconTypeComponent = getViewIconTypeComponent;
}
