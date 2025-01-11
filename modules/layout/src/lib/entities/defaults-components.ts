import { ComponentEntity, TypeComponent } from './component-entity';
import { PositionAlignment, Properties, TextAlignment } from './properties';
import { Actions } from './actions';
import { CommonsUI } from '@amad-web-admin/modules/core';

export const defaultActions: Actions = new (class implements Actions {
  call = '';
  openSections = '';
  openWebView = '';
  showBySchedule = [];
})();

export const buttonComponent: ComponentEntity = new (class
  implements ComponentEntity
{
  UUID = crypto.randomUUID();
  actions = defaultActions;
  properties = createDefaultPosition(
    { x: 0, y: 0 },
    {
      width: CommonsUI.BUTTON_MIN_W,
      height: CommonsUI.BUTTON_MIN_H,
    }
  );
  type = TypeComponent.BUTTON;
})();

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
