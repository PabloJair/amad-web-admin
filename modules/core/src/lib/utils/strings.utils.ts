
export function defaultEmptyOrNull(value:string,defaultValue =""):string{

  return value == undefined ||value.length==0?defaultValue:value;
}
