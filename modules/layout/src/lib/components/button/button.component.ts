import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ComponentEntity } from '../../entities/component-entity';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import {
  defaultComponentEntity,
  getAlignmentText,
} from '../../entities/compontents-utils';

@Component({
  selector: 'lib-app-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    ResizableDirective,
    CdkDrag,
    LayoutDragComponent,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  cdkDragBoundaryName = input<string>('');
  onSelectedComponent = output<ComponentEntity>();

  component = input<ComponentEntity>(defaultComponentEntity);

  fontSize = computed(() => {
    return;
  });

  isDragging = false;

  onResize($event: { width: number; height: number }) {
    this.onSelectedComponent.emit(this.component());
    this.component().properties.size = $event;
    this.isDragging = true;
  }

  onFinishResized($event: boolean) {
    this.isDragging = $event;
  }

  protected readonly CommonsUI = CommonsUI;

  changePosition($event: { x: number; y: number }) {
    this.component().properties.position = $event;
  }

  protected readonly getAlignmentText = getAlignmentText;
}
