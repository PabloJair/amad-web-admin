import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { ComponentEntity } from '@amad-web-admin/modules/layout';
import { defaultComponentEntity } from '../../entities/defaults-components';
import { ResizableDirective } from '@amad-web-admin/modules/core';

@Component({
  selector: 'lib-video',
  standalone: true,
  imports: [CommonModule, LayoutDragComponent, ResizableDirective],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent {
  cdkDragBoundaryName = input<string>('');
  isDragging = false;

  component = input<ComponentEntity>(defaultComponentEntity());

  changePosition($event: { x: number; y: number }) {
    this.component().properties.position = $event;
  }

  onResize($event: { width: number; height: number }) {
    this.component().properties.size = $event;
    this.isDragging = true;
  }

  onFinishResized($event: boolean) {
    this.isDragging = $event;
  }
}
