export interface Properties{

  idAnalytics?:string,
  size?:{
    width?:number,
    height?:number
  },
  background?:string
  text?:string
  margin?:{
    top?:number,
    bottom?:number,
    left?:number,
    right?:number
  },
  cornerRadius?:number,
  fontSize?:number,
  alignment?:"left"|"center"|"right"
  colorText?:string,
  colorGradient?:{
    start?:string,
    end?:string,
  }
}