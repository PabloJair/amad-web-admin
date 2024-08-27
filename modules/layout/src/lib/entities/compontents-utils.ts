import { ComponentEntity, TypeComponent } from './component-entity';


export const buttonComponent: ComponentEntity = {
  type: TypeComponent.BUTTON,
  properties: {},
  UUID: ''


};
export const textComponent: ComponentEntity = {
  type: TypeComponent.TEXT,
  properties: {},
  UUID: ''
};

export const imageComponent: ComponentEntity = {
  type: TypeComponent.IMAGE,
  properties: {},
  UUID: ''
};

export const carouselComponent: ComponentEntity = {
  type: TypeComponent.CARROUSEL,
  properties: {},
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