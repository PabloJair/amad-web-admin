import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ComponentEntity, defaultComponentEntity } from '../../entities/component-entity';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-app-button',
  standalone: true,
  imports: [CommonModule, MatButton, ResizableDirective, CdkDrag],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {


  cdkDragBoundaryName = input<string>('');

  component = input<ComponentEntity>(defaultComponentEntity);

  style = signal({
    'font-size.px': 10

  });
  fontSize = computed(() => {
    return;
  });

  isDragging = false;

  constructor() {

    effect(() => {
      this.style.update(() => ({
        'font-size.px': this.component().properties?.fontSize ?? 15
      }));
    }, {
      allowSignalWrites: true
    });

  }


  updateFontSize(newStyles: Partial<{ 'font-size.px': number }>) {
    this.style.update(currentStyle => ({
      ...currentStyle,
      ...newStyles
    }));
  }

  onResize($event: { width: number; height: number }) {
    this.component().properties.size = $event;
    console.log($event);
    this.isDragging = true;
  }

  onFinishResized($event: boolean) {
    this.isDragging = $event;
    console.log(this.isDragging);
  }

  onDragMoved(event: CdkDragEnd): void {
    const boundaryRect = (event.source.element.nativeElement.parentElement as HTMLElement).getBoundingClientRect();
    const dragRect = event.source.element.nativeElement.getBoundingClientRect();
    console.log('Drag Position:', event);


    const position = {
      x: dragRect.left - boundaryRect.left,
      y: dragRect.top - boundaryRect.top
    };
    position.x = position.x < 0 ? 0 : position.x;
    position.y = position.y < 0 ? 0 : position.y;


    console.log('Drag Position:', position);
  }

  protected readonly CommonsUI = CommonsUI;
}

