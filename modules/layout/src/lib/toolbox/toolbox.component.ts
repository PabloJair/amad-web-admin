import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropList } from '@angular/cdk/drag-drop';
import {
  componentsToolBox,
  getViewIconTypeComponent,
  getViewNameTypeComponent,
} from '../entities/compontents-utils';
import { MatIcon } from '@angular/material/icon';
import { ComponentEntity, TypeComponent } from '@amad-web-admin/shared';

@Component({
  selector: 'lib-toolbox',
  standalone: true,
  imports: [CommonModule, CdkDropList, MatIcon],
  templateUrl: './toolbox.component.html',
  styleUrl: './toolbox.component.scss',
})
export class ToolboxComponent {
  addedComponent = output<TypeComponent>();

  componentEntities: ComponentEntity[] = componentsToolBox;
  protected readonly getViewNameTypeComponent = getViewNameTypeComponent;

  addComponent(typeComponent: TypeComponent) {
    this.addedComponent.emit(typeComponent);
  }

  protected readonly getViewIconTypeComponent = getViewIconTypeComponent;
}
