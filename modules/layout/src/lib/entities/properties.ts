export interface Properties {

  idAnalytics?: string,
  size: {
    width: number,
    height: number
  },
  background?: string
  text?: string
  textAlignment?: 'TS' | 'TC' | 'TE' | 'MS' | 'MC' | 'ME' | 'ES' | 'EC' | 'EE',
  margin?: {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
  },
  position: {
    x: number,
    y: number
  }
  urlImage?: string
  base64Image?: string
  cornerRadius: number,
  fontSize?: number,
  alignment?: 'left' | 'center' | 'right'
  colorText?: string,
  colorGradient?: {
    start?: string,
    end?: string,
  }
}