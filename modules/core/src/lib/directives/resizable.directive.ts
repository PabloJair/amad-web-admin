import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  input,
  output,
  Renderer2,
} from '@angular/core';
import { CommonsUI } from '../utils/commons.strings';

@Directive({
  standalone: true,
  selector: '[coreResizable]',
})
export class ResizableDirective implements AfterViewInit {
  private resizes: HTMLElement[] = [];
  resized = output<{ width: number; height: number }>();
  finishResized = output<boolean>();
  minWidth = input<number>(CommonsUI.BUTTON_MIN_W);
  minHeight = input<number>(CommonsUI.BUTTON_MIN_H);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.createResizes();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (this.resizes.includes(event.target as HTMLElement)) {
      this.initResize(event);
      this.finishResized.emit(true);
    }
  }

  private createResizes() {
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

    positions.forEach((pos) => {
      const resizer = this.renderer.createElement('div');
      this.renderer.setStyle(resizer, 'width', '15px');
      this.renderer.setStyle(resizer, 'height', '15px');
      this.renderer.setStyle(resizer, 'background', 'transparent');
      this.renderer.setStyle(resizer, 'position', 'absolute');
      this.renderer.setStyle(resizer, 'cursor', this.getCursor(pos));

      switch (pos) {
        case 'top-left':
          this.renderer.setStyle(resizer, 'left', '0');
          this.renderer.setStyle(resizer, 'top', '0');
          break;
        case 'top-right':
          this.renderer.setStyle(resizer, 'right', '0');
          this.renderer.setStyle(resizer, 'top', '0');
          break;
        case 'bottom-left':
          this.renderer.setStyle(resizer, 'left', '0');
          this.renderer.setStyle(resizer, 'bottom', '0');
          break;
        case 'bottom-right':
          this.renderer.setStyle(resizer, 'right', '0');
          this.renderer.setStyle(resizer, 'bottom', '0');
          break;
      }

      this.renderer.appendChild(this.el.nativeElement, resizer);
      this.resizes.push(resizer);
    });

    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  private getCursor(position: string): string {
    switch (position) {
      case 'top-left':
      case 'bottom-right':
        return 'nwse-resize';
      case 'top-right':
      case 'bottom-left':
        return 'nesw-resize';
      default:
        return 'default';
    }
  }

  private initResize(event: MouseEvent) {
    event.preventDefault();
    const element = this.el.nativeElement;
    const initialWidth = element.offsetWidth;
    const initialHeight = element.offsetHeight;
    const initialX = event.clientX;
    const initialY = event.clientY;

    const mouseMoveListener = this.renderer.listen('document', 'mousemove', (e) =>
      this.onMouseMove(e, initialWidth, initialHeight, initialX, initialY)
    );

    const mouseUpListener = this.renderer.listen('document', 'mouseup', () => {
      mouseMoveListener();
      mouseUpListener();
      console.log('mouseUpListener');
      this.finishResized.emit(false);
    });
  }

  private onMouseMove(
    event: MouseEvent,
    initialWidth: number,
    initialHeight: number,
    initialX: number,
    initialY: number
  ) {
    const element = this.el.nativeElement;
    let newWidth = initialWidth + (event.clientX - initialX);
    let newHeight = initialHeight + (event.clientY - initialY);

    if (newWidth <= this.minWidth()) {
      newWidth = this.minWidth();
    }
    if (newHeight <= this.minHeight()) {
      newHeight = this.minHeight();
    }
    this.resized.emit({ height: newHeight, width: newWidth });

    this.renderer.setStyle(element, 'width', `${newWidth}px`);
    this.renderer.setStyle(element, 'height', `${newHeight}px`);
  }
}
