import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-layout-drag',
  standalone: true,
  imports: [CommonModule, CdkDrag],
  templateUrl: './layout-drag.component.html',
  styleUrl: './layout-drag.component.scss'
})
export class LayoutDragComponent {
  cdkDragBoundaryName = input<string>('');
  isDragging = input(false);
  changePosition = output<{ x: number, y: number }>();

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

    this.changePosition.emit(position);
    console.log('Drag Position:', position);
  }
}
