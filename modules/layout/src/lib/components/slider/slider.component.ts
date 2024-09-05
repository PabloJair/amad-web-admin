import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarousel } from '../../entities/properties';

@Component({
  selector: 'lib-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  slides = input<ItemCarousel[]>([]);

  currentSlide = 0;

  constructor() {
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides().length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides().length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.currentSlide);
  }
}
