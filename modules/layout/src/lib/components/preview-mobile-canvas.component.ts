import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-preview-mobile-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-mobile-canvas.component.html',
  styleUrl: './preview-mobile-canvas.component.scss',
})
export class PreviewMobileCanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  private buttons: { x: number; y: number; width: number; height: number; text: string }[] = [];
  private activeButtonIndex: number | null = null; // Índice del botón activo
  private isResizing = false;
  private resizeHandleSize = 10;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.ctx = canvas.getContext('2d')!;

    // Crear algunos botones iniciales
    this.buttons = [
      { x: 50, y: 50, width: 100, height: 40, text: 'Button 1' },
      { x: 200, y: 100, width: 120, height: 50, text: 'Button 2' },
      { x: 400, y: 200, width: 150, height: 60, text: 'Button 3' },
    ];

    this.drawButtons();

    // Agregar eventos al canvas
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  drawButtons() {
    // Limpiar el canvas
    this.ctx.clearRect(0, 0, 600, 400);

    // Dibujar todos los botones
    this.buttons.forEach((button) => {
      // Dibujar el botón
      this.ctx.fillStyle = 'lightgray';
      this.ctx.fillRect(button.x, button.y, button.width, button.height);

      // Dibujar el texto
      this.ctx.fillStyle = 'black';
      this.ctx.font = '16px Arial';
      this.ctx.fillText(button.text, button.x + 10, button.y + button.height / 2 + 5);

      // Dibujar el manejador de redimensionamiento
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(
        button.x + button.width - this.resizeHandleSize,
        button.y + button.height - this.resizeHandleSize,
        this.resizeHandleSize,
        this.resizeHandleSize
      );
    });
  }

  getButtonIndex(x: number, y: number): number | null {
    for (let i = 0; i < this.buttons.length; i++) {
      const button = this.buttons[i];
      if (
        x >= button.x &&
        x <= button.x + button.width &&
        y >= button.y &&
        y <= button.y + button.height
      ) {
        return i;
      }
    }
    return null;
  }

  isOnResizeHandle(
    x: number,
    y: number,
    button: {
      x: number;
      y: number;
      width: number;
      height: number;
      text: string;
    }
  ): boolean {
    return (
      x >= button.x + button.width - this.resizeHandleSize &&
      x <= button.x + button.width &&
      y >= button.y + button.height - this.resizeHandleSize &&
      y <= button.y + button.height
    );
  }

  onMouseDown(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const buttonIndex = this.getButtonIndex(x, y);

    if (buttonIndex !== null) {
      const button = this.buttons[buttonIndex];

      if (this.isOnResizeHandle(x, y, button)) {
        this.isResizing = true;
        this.activeButtonIndex = buttonIndex;
      } else {
        this.activeButtonIndex = buttonIndex;
      }
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.activeButtonIndex === null) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const button = this.buttons[this.activeButtonIndex];

    if (this.isResizing) {
      // Redimensionar el botón activo
      const newWidth = x - button.x;
      const newHeight = y - button.y;

      if (newWidth > this.resizeHandleSize && newHeight > this.resizeHandleSize) {
        button.width = newWidth;
        button.height = newHeight;
        this.drawButtons();
      }
    } else {
      // Mover el botón activo
      button.x = x - button.width / 2;
      button.y = y - button.height / 2;
      this.drawButtons();
    }
  }

  onMouseUp() {
    this.isResizing = false;
    this.activeButtonIndex = null;
  }
}
