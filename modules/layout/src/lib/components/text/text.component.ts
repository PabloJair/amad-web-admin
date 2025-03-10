import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { CommonsUI } from '@amad-web-admin/modules/core';
import { ComponentEntity } from '../../entities/component-entity';
import { getAlignmentText } from '../../entities/compontents-utils';
import { defaultComponentEntity } from '../../entities/defaults-components';

@Component({
  selector: 'lib-text',
  standalone: true,
  imports: [CommonModule, LayoutDragComponent],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
})
export class TextComponent {
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

  protected readonly getAlignmentText = getAlignmentText;
}
