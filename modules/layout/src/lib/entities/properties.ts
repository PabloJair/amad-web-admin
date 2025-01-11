export interface Properties {
  idAnalytics?: string;
  actionAnalytics?: string;
  size: {
    width: number;
    height: number;
  };
  imageSize: {
    width: number;
    height: number;
  };
  positionImage: PositionAlignment;
  background?: string;
  text?: string;
  textAlignment: TextAlignment;
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  position: {
    x: number;
    y: number;
  };
  urlImage?: string;
  base64Image?: string;
  cornerRadius: number;
  fontSize?: number;
  alignment?: 'left' | 'center' | 'right';
  colorText?: string;
  colorGradient?: {
    start?: string;
    end?: string;
  };
  itemCarousel?: ItemCarousel[];
}

export interface ItemCarousel {
  src: string;
  title: string;
  id: string;
}

export enum PositionAlignment {
  LEFT = 'left',
  BOTTOM = 'bottom',
  RIGHT = 'right',
  TOP = 'top',
}

export enum TextAlignment {
  TopStart = 'TS',
  TopCenter = 'TC',
  TopEnd = 'TE',
  MiddleStart = 'MS',
  MiddleCenter = 'MC',
  MiddleEnd = 'ME',
  EndStart = 'ES',
  EndCenter = 'EC',
  EndEnd = 'EE',
}
