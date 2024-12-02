import {
  Directive,
  ElementRef,
  HostListener,
  input,
  Renderer2,
} from '@angular/core';
import { CommonsUI } from '../utils/commons.strings';

@Directive({
  standalone: true,
  selector: '[coreDraggable]',
})
export class DraggableDirective {
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private initialX = 0;
  private initialY = 0;
  dx = input<number>(CommonsUI.DEFAULT_DX);
  dy = input<number>(CommonsUI.DEFAULT_DY);

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'move');
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.dy}px`);
    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.dx}px`);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.initialX = rect.left;
    this.initialY = rect.top;

    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event']) onMouseMove(
    event: MouseEvent
  ) {
    if (this.isDragging) {
      const offsetX = event.clientX - this.startX;
      const offsetY = event.clientY - this.startY;

      this.renderer.setStyle(
        this.el.nativeElement,
        'left',
        `${this.initialX + offsetX}px`
      );
      this.renderer.setStyle(
        this.el.nativeElement,
        'top',
        `${this.initialY + offsetY}px`
      );
    }
  }

  @HostListener('document:mouseup') onMouseUp() {
    this.isDragging = false;
  }
}
