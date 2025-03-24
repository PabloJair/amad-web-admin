import { AfterViewInit, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';
import { ComponentEntity } from '@amad-web-admin/shared';
import { defaultComponentEntity } from '../../entities/defaults-components';

@Component({
  selector: 'lib-image',
  standalone: true,
  imports: [CommonModule, LayoutDragComponent, ResizableDirective],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements AfterViewInit {
  cdkDragBoundaryName = input<string>('');

  ngAfterViewInit(): void {
    this.component().properties.background = undefined;
  }

  component = input<ComponentEntity>(defaultComponentEntity());
  selectedComponent = output<ComponentEntity>();

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
