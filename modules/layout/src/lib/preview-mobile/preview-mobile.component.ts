import { Component, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import { MatButton } from '@angular/material/button';
import { ButtonComponent } from '../components/button/button.component';
import { createComponent } from '../entities/compontents-utils';
import { TextComponent } from '../components/text/text.component';
import { ImageComponent } from '../components/image/image.component';
import { ButtonImageComponent } from '../components/buttom-image/button-image.component';
import { CarouselComponent } from '../components/carousel/carousel.component';

@Component({
  selector: 'lib-preview-mobile',
  standalone: true,
  imports: [
    CommonModule,
    CdkDrag,
    NgOptimizedImage,
    CdkDropList,
    MatButton,
    ButtonComponent,
    TextComponent,
    ImageComponent,
    ButtonImageComponent,
    CarouselComponent,
  ],
  templateUrl: './preview-mobile.component.html',
  styleUrl: './preview-mobile.component.scss',
})
export class PreviewMobileComponent {
  componentEntitiesAdd: ComponentEntity[] = [];
  onSelectedComponent = output<ComponentEntity>();

  public addNewComponent(typeComponent: TypeComponent): void {
    const newComponent = createComponent(typeComponent);
    const clonedComponent = { ...newComponent };

    if (this.componentEntitiesAdd === undefined) {
      this.componentEntitiesAdd = [];
    }
    this.componentEntitiesAdd.push(clonedComponent);
  }

  public reloadComponent(componentEntity: ComponentEntity[]) {
    this.componentEntitiesAdd = componentEntity;
  }

  public deleteComponent(uuid: string): void {
    this.componentEntitiesAdd = this.componentEntitiesAdd.filter(
      (value) => value.UUID !== uuid
    );
  }

  protected readonly TypeComponent = TypeComponent;

  showProperties(item: ComponentEntity) {
    this.onSelectedComponent.emit(item);
  }
}
