import { AfterViewInit, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { ComponentEntity } from '@amad-web-admin/modules/layout';
import { getAlignmentText } from '../../entities/compontents-utils';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';
import { PositionAlignment } from '@amad-web-admin/modules/layout';
import { defaultComponentEntity } from '../../entities/defaults-components';

@Component({
  selector: 'lib-button-image',
  standalone: true,
  imports: [CommonModule, LayoutDragComponent, ResizableDirective],
  templateUrl: './button-image.component.html',
  styleUrl: './button-image.component.scss',
})
export class ButtonImageComponent {
  cdkDragBoundaryName = input<string>('');

  component = input<ComponentEntity>(defaultComponentEntity());

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

  getAlignmentImage(positionAlignment: PositionAlignment): string {
    switch (positionAlignment) {
      case PositionAlignment.LEFT:
        return 'flex-row-reverse';
      case PositionAlignment.BOTTOM:
        return 'flex-col';
      case PositionAlignment.RIGHT:
        return 'flex-row';
      case PositionAlignment.TOP:
        return 'flex-col-reverse';
    }
  }

  protected readonly getAlignmentText = getAlignmentText;
}
