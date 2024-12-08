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
import {
  CdkDrag,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { ComponentEntity, TypeComponent } from '../entities/component-entity';
import { MatButton } from '@angular/material/button';
import { ButtonComponent } from '../components/button/button.component';
import {
  createComponent,
  defaultComponentEntity,
} from '../entities/compontents-utils';
import { TextComponent } from '../components/text/text.component';
import { ImageComponent } from '../components/image/image.component';
import { ButtonImageComponent } from '../components/buttom-image/button-image.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { LayoutDragComponent } from '../components/layout-drag/layout-drag.component';

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
    CdkDropListGroup,
    CdkDragHandle,
    LayoutDragComponent,
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
  @ViewChild('contenedor', { read: ViewContainerRef, static: true })
  contenedor!: ViewContainerRef;

  constructor(private cdr: ChangeDetectorRef) {}

  public addNewComponent(typeComponent: TypeComponent): void {
    const component = { ...createComponent(typeComponent) };
    const data = this.contenedor.createComponent(ButtonComponent);
    data.setInput('cdkDragBoundaryName', 'boundary');
    data.setInput('component', component);
    data.instance.onSelectedComponent.subscribe((value) => {
      this.showProperties(value);
    });
    this.componentEntitiesAdd().push(component);
  }

  public updateTotalSize() {
    const arrayLasComponent = this.componentEntitiesAdd().slice(0, -1);

    const totalHeight = arrayLasComponent.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.properties.size.height,
      0
    );
    const totalWidth = arrayLasComponent.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.properties.size.width,
      0
    );
    this.totalSize = signal({
      height: totalHeight,
      width: totalWidth,
    });
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
    this.cdr.detectChanges();

    this.componentEntitiesAdd.update(() =>
      this.componentEntitiesAdd().filter((value) => value.UUID !== uuid)
    );
  }

  protected readonly TypeComponent = TypeComponent;

  showProperties(item: ComponentEntity) {
    this.onSelectedComponent.emit(item);
  }

  protected readonly defaultComponentEntity = defaultComponentEntity;
}
