import { Component, computed, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';
import { ComponentEntity } from '@amad-web-admin/modules/layout';
import { defaultComponentEntity } from '../../entities/compontents-utils';

@Component({
  selector: 'lib-image',
  standalone: true,
  imports: [
    CommonModule,
    LayoutDragComponent,
    ResizableDirective,
    NgOptimizedImage,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  cdkDragBoundaryName = input<string>('');

  component = input<ComponentEntity>(defaultComponentEntity);

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
}
