import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  input,
  output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragEnd,
  CdkDragMove,
  CdkDragStart,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonsUI } from '@amad-web-admin/modules/core';

@Component({
  selector: 'lib-layout-drag',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList],
  templateUrl: './layout-drag.component.html',
  styleUrl: './layout-drag.component.scss',
})
export class LayoutDragComponent {
  cdkDragBoundaryName = input<string>('');
  isDragging = input(false);
  changePosition = output<{ x: number; y: number }>();
  dx = input<number>(CommonsUI.DEFAULT_DX);
  dy = input<number>(CommonsUI.DEFAULT_DY);
  @ViewChild('dragContainer', { static: false }) dragContainer!: ElementRef;

  constructor(public el: ElementRef) {}

  onDragEnd(event: CdkDragEnd): void {
    const boundaryRect = (
      event.source.element.nativeElement.parentElement as HTMLElement
    ).getBoundingClientRect();

    console.log('onDragEnd', event);
    const dragRect = event.source.element.nativeElement.getBoundingClientRect();

    // Calcular la posición de forma correcta considerando el contenedor y el desplazamiento
    const position = {
      x: dragRect.left - boundaryRect.left,
      y: dragRect.top - boundaryRect.top,
    };

    // Emitir la nueva posición
    this.changePosition.emit(position);
    this.dragContainer.nativeElement.style.left = `${position.x}px`;
    this.dragContainer.nativeElement.style.left = `${position.y}px`;
  }

  onDragStart($event: CdkDragStart) {
    console.log('dx:', this.dx());
    console.log('dy:', this.dy());
  }

  onDragMoved($event: CdkDragMove) {}
}
