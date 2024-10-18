import { Component, computed, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ComponentEntity } from '../../entities/component-entity';
import { carouselComponent } from '../../entities/compontents-utils';
import { LayoutDragComponent } from '../layout-drag/layout-drag.component';
import { CommonsUI, ResizableDirective } from '@amad-web-admin/modules/core';
import { SliderComponent } from '../slider/slider.component';

interface Image {
  src: string;
  title?: string;
  alt?: string;
}

@Component({
  selector: 'lib-carousel',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LayoutDragComponent,
    ResizableDirective,
    SliderComponent,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('activeSlide', [
      state(
        'active',
        style({
          transform: 'scale(1.4)',
          opacity: 1,
        })
      ),
      state(
        'inActive',
        style({
          transform: 'scale(0.7)',
          opacity: 0.8,
        })
      ),
      transition('active => inActive', [animate('0.5s')]),
      transition('inActive => active', [animate('0.5s')]),
    ]),
  ],
})
export class CarouselComponent {
  cdkDragBoundaryName = input<string>('');

  component = input<ComponentEntity>(carouselComponent);

  fontSize = computed(() => {
    return;
  });

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

  protected readonly carouselComponent = carouselComponent;
}
