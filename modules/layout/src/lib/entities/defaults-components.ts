import {
  ComponentEntity,
  TypeComponent,
  Actions,
  PositionAlignment,
  Properties,
  TextAlignment,
} from '@amad-web-admin/modules/network';
import { CommonsUI } from '@amad-web-admin/modules/core';
import { v4 as uuidv4 } from 'uuid';

export function defaultActions(): Actions {
  return new (class implements Actions {
    call = '';
    openSections = '';
    openWebView = '';
    showBySchedule = [];
  })();
}

export function buttonComponent(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.BUTTON_MIN_W,
        height: CommonsUI.BUTTON_MIN_H,
      }
    );
    type = TypeComponent.BUTTON;
  })();
}

export function imageComponent(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.IMAGE_MIN_W,
        height: CommonsUI.IMAGE_MIN_H,
      }
    );
    type = TypeComponent.IMAGE;
  })();
}

export function imageButtonComponent(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.IMAGE_MIN_W,
        height: CommonsUI.IMAGE_MIN_H,
      }
    );
    type = TypeComponent.IMAGE_BUTTON;
  })();
}

export function carouselComponent(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.CAROUSEL_MIN_W,
        height: CommonsUI.CAROUSEL_MIN_H,
      }
    );
    type = TypeComponent.CARROUSEL;
  })();
}

export function textComponent(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.IMAGE_MIN_W,
        height: CommonsUI.IMAGE_MIN_H,
      }
    );
    type = TypeComponent.TEXT;
  })();
}

export function defaultComponentEntity(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.IMAGE_MIN_W,
        height: CommonsUI.IMAGE_MIN_H,
      }
    );
    type = TypeComponent.UNKNOWN;
  })();
}

export function defaultVideoComponentEntity(): ComponentEntity {
  return new (class implements ComponentEntity {
    UUID = uuidv4();
    actions = defaultActions();
    properties = createDefaultPosition(
      { x: 0, y: 0 },
      {
        width: CommonsUI.VIDEO_W,
        height: CommonsUI.VIDEO_H,
      }
    );
    type = TypeComponent.VIDEO;
  })();
}

function createDefaultPosition(
  position: { x: number; y: number },
  size: {
    width: number;
    height: number;
  }
): Properties {
  return new (class implements Properties {
    imageSize = { width: 10, height: 10 };
    positionImage = PositionAlignment.RIGHT;
    alignment = undefined;
    background = '#000000';
    base64Image = '';
    colorGradient = undefined;
    colorText = '#FFFFFF';
    cornerRadius = 0;
    fontSize = undefined;
    idAnalytics = undefined;
    itemCarousel = [];
    margin = undefined;
    position = position;
    size = size;
    text = undefined;
    textAlignment = TextAlignment.MiddleCenter;
    urlImage = undefined;
  })();
}
