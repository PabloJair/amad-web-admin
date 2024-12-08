import { ComponentEntity, TypeComponent } from './component-entity';
import { CommonsUI } from '@amad-web-admin/modules/core';
import { computed, InputSignal } from '@angular/core';
import { buttonComponent } from './defaults-components';
import { TextAlignment } from '@amad-web-admin/modules/layout';

export const imageButtonComponent: ComponentEntity = {
  UUID: '',
  type: TypeComponent.IMAGE_BUTTON,
  properties: {
    text: 'Botón-Imagen',
    position: {
      x: 0,
      y: 0,
    },
    base64Image: 'img.png',
    size: {
      width: CommonsUI.BUTTON_IMAGE_MIN_W,
      height: CommonsUI.BUTTON_IMAGE_MIN_H,
    },
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    cornerRadius: 0,
    textAlignment: TextAlignment.MiddleCenter,
  },
  actions: {
    call: '',
    openWebView: '',
    openSections: '',
    showBySchedule: [],
  },
};
export const textComponent: ComponentEntity = {
  type: TypeComponent.TEXT,
  properties: {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 60,
      height: 20,
    },
    cornerRadius: 0,
    textAlignment: TextAlignment.MiddleCenter,
  },
  actions: {
    call: '',
    openWebView: '',
    openSections: '',
    showBySchedule: [],
  },
  UUID: '',
};

export const imageComponent: ComponentEntity = {
  type: TypeComponent.IMAGE,
  properties: {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: CommonsUI.IMAGE_MIN_W,
      height: CommonsUI.IMAGE_MIN_H,
    },
    cornerRadius: 0,
    textAlignment: TextAlignment.MiddleCenter,
  },
  actions: {
    call: '',
    openWebView: '',
    openSections: '',
    showBySchedule: [],
  },
  UUID: '',
};

export const carouselComponent: ComponentEntity = {
  type: TypeComponent.CARROUSEL,
  properties: {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: CommonsUI.CAROUSEL_MIN_W,
      height: CommonsUI.CAROUSEL_MIN_H,
    },
    cornerRadius: 0,
    itemCarousel: [],
    textAlignment: TextAlignment.MiddleCenter,
  },
  actions: {
    call: '',
    openWebView: '',
    openSections: '',
    showBySchedule: [],
  },
  UUID: '',
};
export const componentsToolBox: ComponentEntity[] = [
  buttonComponent,
  textComponent,
  imageComponent,
  carouselComponent,
  imageButtonComponent,
];
export const defaultComponentEntity: ComponentEntity = {
  UUID: '',
  type: TypeComponent.UNKNOWN,
  properties: {
    text: '',
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: CommonsUI.BUTTON_MIN_W,
      height: CommonsUI.BUTTON_MIN_H,
    },
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    cornerRadius: 0,
    textAlignment: TextAlignment.MiddleCenter,
  },
  actions: {
    call: '',
    openWebView: '',
    openSections: '',
    showBySchedule: [],
  },
};

export function createComponent(typeComponent: TypeComponent): ComponentEntity {
  let componentEntity: ComponentEntity;

  switch (typeComponent) {
    case TypeComponent.IMAGE:
      componentEntity = imageComponent;
      break;
    case TypeComponent.BUTTON:
      componentEntity = buttonComponent;
      break;
    case TypeComponent.TEXT:
      componentEntity = textComponent;
      break;
    case TypeComponent.CARROUSEL:
      componentEntity = carouselComponent;
      break;
    case TypeComponent.IMAGE_BUTTON:
      componentEntity = imageButtonComponent;
      break;
    case TypeComponent.DIALOG:
      componentEntity = defaultComponentEntity;
      break;
    case TypeComponent.UNKNOWN:
      componentEntity = defaultComponentEntity;
      break;
    default:
      componentEntity = defaultComponentEntity;
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
