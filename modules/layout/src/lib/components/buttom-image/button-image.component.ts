import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { ComponentEntity } from '../../entities/component-entity';
import { defaultComponentEntity, getAlignmentText } from '../../entities/compontents-utils';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';

@Component({
  selector: 'lib-button-image',
  standalone: true,
  imports: [CommonModule, LayoutDragComponent, ResizableDirective],
  templateUrl: './button-image.component.html',
  styleUrl: './button-image.component.scss'
})
export class ButtonImageComponent {
  cdkDragBoundaryName = input<string>('');

  component = input<ComponentEntity>(defaultComponentEntity);

  fontSize = computed(() => {
    return;
  });

  isDragging = false;

  onResize($event: { width: number; height: number }) {
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
