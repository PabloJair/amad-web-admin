import {
  AfterViewInit,
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
export class LayoutDragComponent implements AfterViewInit {
  cdkDragBoundaryName = input<string>('');
  isDragging = input(false);
  changePosition = output<{ x: number; y: number }>();
  dx = input<number>(CommonsUI.DEFAULT_DX);
  dy = input<number>(CommonsUI.DEFAULT_DY);
  @ViewChild('boundary', { static: false }) dragBoundary!: ElementRef;

  constructor(public el: ElementRef, public renderer: Renderer2) {}

  onDragEnd(event: CdkDragEnd): void {
    const boundaryRect = (
      event.source.element.nativeElement.parentElement as HTMLElement
    ).getBoundingClientRect();
    const dragRect = event.source.element.nativeElement.getBoundingClientRect();
    console.log('event:', event.source.getFreeDragPosition());
    const boundaryElement = document.getElementById('boundary');

    const position = {
      x: dragRect.left - boundaryRect.left,
      y: dragRect.top - boundaryRect.top,
    };
    if (boundaryElement) {
      const boundaryRect = boundaryElement.getBoundingClientRect();
    }

    // Calcula la nueva posición dentro del límite
    const newY = dragRect.top - boundaryRect.top;

    position.x = Math.max(0, position.x);
    position.y = Math.max(0, position.y);
    console.log(position);

    this.changePosition.emit(position);
  }

  ngAfterViewInit(): void {
    // Configurar posición inicial
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.dy()}px`);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.dx()}px`);

    // Obtener el tamaño del boundary
    if (this.dragBoundary) {
      const boundaryElement = this.dragBoundary.nativeElement as HTMLElement;
      console.log('Tamaño real del boundary (ngAfterViewInit):', {
        width: boundaryElement.offsetWidth,
        height: boundaryElement.offsetHeight,
      });
    }
  }

  onDragStart($event: CdkDragStart) {
    console.log('dx:', this.dx());
    console.log('dy:', this.dy());

    // También puedes obtener el tamaño aquí, si es necesario
    if (this.dragBoundary) {
      const boundaryElement = this.dragBoundary.nativeElement as HTMLElement;
      console.log('Tamaño real del boundary (onDragStart):', {
        width: boundaryElement.offsetWidth,
        height: boundaryElement.offsetHeight,
      });
    }
  }
}
