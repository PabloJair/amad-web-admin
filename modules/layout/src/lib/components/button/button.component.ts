import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ComponentEntity } from '../../entities/component-entity';
import {
  CommonsUI,
  DraggableDirective,
  ResizableDirective,
} from '@amad-web-admin/modules/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
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
    CdkDragHandle,
    DraggableDirective,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements AfterViewInit {
  cdkDragBoundaryName = input<string>('');
  onSelectedComponent = output<ComponentEntity>();
  public component = input<ComponentEntity>(defaultComponentEntity);
  totalSize = input<{ width: number; height: number }>({
    height: 0,
    width: 0,
  });
  fontSize = computed(() => {
    return;
  });

  defaultX = 0;
  defaultY = 0;

  isDragging = false;

  ngAfterViewInit(): void {
    this.defaultX = this.component().properties.position.x;
    this.defaultY = this.component().properties.position.y;
  }

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
    this.component().properties.position.y = this.totalSize().height + $event.y;
    this.component().properties.position.x = this.totalSize().width + $event.x;
  }

  protected readonly getAlignmentText = getAlignmentText;
}
