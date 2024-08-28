import { ComponentEntity, TypeComponent } from './component-entity';
import { CommonsUI } from '@amad-web-admin/modules/core';


export const buttonComponent: ComponentEntity = {
  type: TypeComponent.BUTTON,
  properties: {
    size: {
      width: CommonsUI.BUTTON_MIN_W,
      height: CommonsUI.BUTTON_MIN_H
    }
  },
  UUID: ''


};
export const textComponent: ComponentEntity = {
  type: TypeComponent.TEXT,
  properties: {
    size: {
      width: 60,
      height: 20
    }
  },
  UUID: ''
};

export const imageComponent: ComponentEntity = {
  type: TypeComponent.IMAGE,
  properties: {
    size: {
      width: 60,
      height: 20
    }
  },
  UUID: ''
};

export const carouselComponent: ComponentEntity = {
  type: TypeComponent.CARROUSEL,
  properties: {
    size: {
      width: 60,
      height: 20
    }
  },
  UUID: ''
};
export const componentsToolBox: ComponentEntity[] = [
  buttonComponent,
  textComponent,
  imageComponent,
  carouselComponent
];


export function getViewNameTypeComponent(componentEntity: ComponentEntity): string {
  const viewNameMap: { [key in TypeComponent]?: string } = {
    [TypeComponent.IMAGE]: 'Imagen',
    [TypeComponent.BUTTON]: 'Boton',
    [TypeComponent.TEXT]: 'Texto',
    [TypeComponent.CARROUSEL]: 'Carrusel',
    [TypeComponent.DIALOG]: 'Dialog'
  };

  return viewNameMap[componentEntity.type] ?? 'Unknown Component Type';
}

export function getViewIconTypeComponent(componentEntity: ComponentEntity): string {
  const viewNameMap: { [key in TypeComponent]?: string } = {
    [TypeComponent.IMAGE]: 'image',
    [TypeComponent.BUTTON]: 'gamepad',
    [TypeComponent.TEXT]: 'title',
    [TypeComponent.CARROUSEL]: 'web_stories',
    [TypeComponent.DIALOG]: 'dialogs'
  };

  return viewNameMap[componentEntity.type] ?? 'Unknown Component Type';
}