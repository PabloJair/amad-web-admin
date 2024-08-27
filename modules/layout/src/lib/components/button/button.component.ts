import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ComponentEntity, defaultComponentEntity } from '../../entities/component-entity';
import { ResizableDirective } from '@amad-web-admin/modules/core';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-app-button',
  standalone: true,
  imports: [CommonModule, MatButton,ResizableDirective,CdkDrag],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {

  component = input<ComponentEntity>(defaultComponentEntity)

  style=signal({
    'font-size.px':  10

})
   fontSize  = computed(()=> {
    return
  })
  constructor() {


    effect(() => {
      this.style.update(() => ({
        'font-size.px':this.component().properties?.fontSize ?? 15
      }))
    },{
      allowSignalWrites:true
    });

  }


  updateFontSize(newStyles: Partial<{ 'font-size.px': number }>) {
    this.style.update(currentStyle => ({
      ...currentStyle,
      ...newStyles,
    }));
  }
}

