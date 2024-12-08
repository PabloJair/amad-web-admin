export interface Properties {
  idAnalytics?: string;
  size: {
    width: number;
    height: number;
  };
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
