
export interface CompanyItem   {
  "contacto": string,
  "id_cia": number,
  "status": ProjectStatus,
  "nombre": string,
  "nombre_comercial": string,
  "id_app_google": string,
  "telefono": string,
}


export interface ProjectItem   {
  "id_application": number,
  "id_cia": number,
  "status": number,
  "application_name": string,
  "application_description": string,
  "id_app_google": string,
  "icon": string,
  "icon_qr": string,
  "url_qr": string,
  "version": string
}


export interface AddOrEditProjectRequest {
  "status": number,
  "application_name": string,
  "application_description": string,
  "icon": string,
  "version": string,
  "id_app_google": string,
  "id_cia": number,
  "url_qr": string,
  "icon_qr": string
}
export interface StatusProject{
  status:ProjectStatus

}
export enum ProjectStatus{
  DISABLE,ACTIVE
}


export interface ProjectInformationResponse{
"jsons": [
  {
    "id_application": number,
    "id_json": number,
    "status": number,
    "is_default": boolean,
    "language": string,
    "json": string
  }
],
  "application": ProjectItem[]
}