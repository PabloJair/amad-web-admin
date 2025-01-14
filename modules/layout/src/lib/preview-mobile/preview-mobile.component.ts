import {
  ChangeDetectorRef,
  Component,
  input,
  output,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import { ButtonComponent } from '../components/button/button.component';
import { createComponent } from '../entities/compontents-utils';
import { TextComponent } from '../components/text/text.component';
import { ImageComponent } from '../components/image/image.component';
import { ButtonImageComponent } from '../components/buttom-image/button-image.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { defaultComponentEntity } from '../entities/defaults-components';
import { VideoComponent } from '../components/video/video.component';

@Component({
  selector: 'lib-preview-mobile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    TextComponent,
    ImageComponent,
    ButtonImageComponent,
    CarouselComponent,
    CdkDragHandle,
    VideoComponent,
  ],
  templateUrl: './preview-mobile.component.html',
  styleUrl: './preview-mobile.component.scss',
})
export class PreviewMobileComponent {
  componentEntitiesAdd = signal<ComponentEntity[]>([]);
  totalSize = signal<{ width: number; height: number }>({
    height: 0,
    width: 0,
  });
  onSelectedComponent = output<ComponentEntity>();
  clean = output();

  constructor(private cdr: ChangeDetectorRef) {}

  public addNewComponent(typeComponent: TypeComponent): ComponentEntity {
    const component = { ...createComponent(typeComponent) };
    this.componentEntitiesAdd().push(component);
    this.cdr.detectChanges();

    return component;
  }

  public reloadComponent(componentEntity: ComponentEntity[]) {
    this.componentEntitiesAdd.update(() => componentEntity);
    this.totalSize = signal({
      height: 0,
      width: 0,
    });
    this.cdr.detectChanges();
  }

  public deleteComponent(uuid: string): void {
    this.componentEntitiesAdd.update(() =>
      this.componentEntitiesAdd().filter((value) => value.UUID !== uuid)
    );
  }

  protected readonly TypeComponent = TypeComponent;

  showProperties(item: ComponentEntity) {
    this.onSelectedComponent.emit(item);
  }

  protected readonly defaultComponentEntity = defaultComponentEntity();
}
