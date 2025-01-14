import { ComponentEntity, TypeComponent } from './component-entity';
import { computed, InputSignal } from '@angular/core';
import {
  buttonComponent,
  carouselComponent,
  defaultComponentEntity,
  defaultVideoComponentEntity,
  imageButtonComponent,
  imageComponent,
  textComponent,
} from './defaults-components';

export const componentsToolBox: ComponentEntity[] = [
  buttonComponent(),
  textComponent(),
  imageComponent(),
  carouselComponent(),
  imageButtonComponent(),
  defaultVideoComponentEntity(),
];

export function createComponent(typeComponent: TypeComponent): ComponentEntity {
  let componentEntity: ComponentEntity;

  switch (typeComponent) {
    case TypeComponent.IMAGE:
      componentEntity = imageComponent();
      break;
    case TypeComponent.BUTTON:
      componentEntity = buttonComponent();
      break;
    case TypeComponent.TEXT:
      componentEntity = textComponent();
      break;
    case TypeComponent.CARROUSEL:
      componentEntity = carouselComponent();
      break;
    case TypeComponent.IMAGE_BUTTON:
      componentEntity = imageButtonComponent();
      break;
    case TypeComponent.DIALOG:
      componentEntity = defaultComponentEntity();
      break;
    case TypeComponent.VIDEO:
      componentEntity = defaultVideoComponentEntity();
      break;
    case TypeComponent.UNKNOWN:
      componentEntity = defaultComponentEntity();
      break;
    default:
      componentEntity = defaultComponentEntity();
      break;
  }
  componentEntity.UUID = crypto.randomUUID();
  return componentEntity;
}

export function getViewNameTypeComponent(
  componentEntity: ComponentEntity
): string {
  const viewNameMap: { [key in TypeComponent]?: string } = {
    [TypeComponent.IMAGE]: 'Imagen',
    [TypeComponent.BUTTON]: 'Boton',
    [TypeComponent.IMAGE_BUTTON]: 'Boton/imagen',
    [TypeComponent.TEXT]: 'Texto',
    [TypeComponent.VIDEO]: 'Video',
    [TypeComponent.CARROUSEL]: 'Carrusel',
    [TypeComponent.DIALOG]: 'Dialog',
  };

  return viewNameMap[componentEntity.type] ?? 'Unknown Component Type';
}

export function getViewIconTypeComponent(
  componentEntity: ComponentEntity
): string {
  const viewNameMap: { [key in TypeComponent]?: string } = {
    [TypeComponent.IMAGE]: 'image',
    [TypeComponent.BUTTON]: 'gamepad',
    [TypeComponent.IMAGE_BUTTON]: 'compare',
    [TypeComponent.TEXT]: 'title',
    [TypeComponent.CARROUSEL]: 'web_stories',
    [TypeComponent.VIDEO]: 'movie',
    [TypeComponent.DIALOG]: 'dialogs',
  };

  return viewNameMap[componentEntity.type] ?? 'Unknown Component Type';
}

export function getAlignmentText(
  typeAlignment?: 'TS' | 'TC' | 'TE' | 'MS' | 'MC' | 'ME' | 'ES' | 'EC' | 'EE'
): string {
  const alignmentText = typeAlignment ? typeAlignment : 'TS';
  const viewNameMap: {
    [key in
      | 'TS'
      | 'TC'
      | 'TE'
      | 'MS'
      | 'MC'
      | 'ME'
      | 'ES'
      | 'EC'
      | 'EE']?: string;
  } = {
    ['TS']: 'justify-start',
    ['TC']: 'justify-center',
    ['TE']: 'justify-end',
    ['MS']: 'justify-start items-center',
    ['MC']: 'justify-center items-center',
    ['ME']: 'justify-end items-center',
    ['ES']: 'justify-start items-end',
    ['EC']: 'justify-center items-end',
    ['EE']: 'justify-end items-end',
  };

  return viewNameMap[alignmentText] ?? 'Unknown Component Type';
}

export function updateProperty(
  name: string,
  value: any,
  componentEntity: InputSignal<ComponentEntity>
) {
  const newComponent = computed(() => componentEntity());
  newComponent().properties = {
    ...newComponent().properties,
    [name]: value,
  };
  return newComponent;
}
