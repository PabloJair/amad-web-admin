import { Directive, ElementRef, HostListener, input, output, Renderer2 } from '@angular/core';
import { CommonsUI } from '../utils/commons.strings';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

@Directive({
  standalone: true,
  selector: '[coreDraggable]',
})
export class DraggableDirective {
  cdkDragBoundaryName = input<string>('');
  isDragging = input(false);
  changePosition = output<{ x: number; y: number }>();
  dx = input<number>(CommonsUI.ZERO);
  dy = input<number>(CommonsUI.ZERO);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('cdkDragEnded', ['$event'])
  onDragEnd(event: CdkDragEnd): void {
    const boundaryRect = (
      event.source.element.nativeElement.parentElement as HTMLElement
    ).getBoundingClientRect();

    const dragRect = event.source.element.nativeElement.getBoundingClientRect();

    // Calcular la posición de forma correcta considerando el contenedor y el desplazamiento
    const position = {
      x: dragRect.left - boundaryRect.left,
      y: dragRect.top - boundaryRect.top,
    };

    // Emitir la nueva posición
    this.changePosition.emit(position);
    console.log('onDragEnd', position);
  }

  @HostListener('cdkDragStarted', ['$event'])
  onDragStart(): void {
    console.log('dx:', this.dx);
    console.log('dy:', this.dy);
  }

  @HostListener('cdkDragMoved', ['$event'])
  onDragMoved(event: CdkDragMove): void {
    // Puedes agregar lógica aquí si es necesario durante el movimiento del arrastre
    console.log('onDragMoved', event.pointerPosition);
  }
}
