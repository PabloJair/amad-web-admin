import { ComponentEntity } from '@amad-web-admin/modules/layout';
import * as UUID from 'uuid';
import {
  MunicipalityResponse,
  NeighborhoodsResponse,
  StatesResponse,
} from '../../sepomex/sepomex.response';

export interface CompanyItem {
  contacto: string;
  id_cia: number;
  status: ProjectStatus;
  nombre: string;
  nombre_comercial: string;
  id_app_google: string;
  telefono: string;
}

export interface ProjectItem {
  id_application: number;
  id_cia: number;
  status: number;
  application_name: string;
  application_description: string;
  id_app_google: string;
  icon: string;
  icon_qr: string;
  url_qr: string;
  version: string;
}

export interface AddOrEditProjectRequest {
  status: number;
  application_name: string;
  application_description: string;
  icon: string;
  version: string;
  id_app_google: string;
  id_cia: number;
  url_qr: string;
  icon_qr: string;
}

export interface StatusProject {
  status: ProjectStatus;
}

export enum ProjectStatus {
  DISABLE,
  ACTIVE,
}

export interface ProjectInformation {
  jsons: JsonProject[];
  application: ProjectItem[];
}

export interface JsonProject {
  id_application: number;
  id_json: number;
  status: number;
  is_default: boolean;
  language: string;
  json: string;
}

export interface LanguagesProject {
  id_language: number;
  status: number;
  code: string;
  description: string;
}

export interface CreateJsonProject {
  id_application: number;
  json: string;
  language: string;
  status: 1;
}

export interface ApplicantProject {
  status: ApplicantProjectStatus;
  appId: string;
  preconfiguration: Preconfiguration;
  views: ApplicantProjectLayout[];
  personalInformation?: PersonalInformation;
}

export interface PersonalInformation {
  showTypesData: TypeInputPersonalInformation[];
  locationInformation?: LocationConfiguration;
  urlImage: string;
  title: string;
}

export enum TypeInputPersonalInformation {
  NAME = 'Nombre',
  PHONE = 'Telefono',
  EMAIL = 'Correo',
  LOCALIZATION_CONFIGURATION = 'Localizacion',
}

export interface LocationConfiguration {
  state?: StatesResponse;
  municipality?: MunicipalityResponse;
  neighborhoods?: NeighborhoodsResponse;
}

export interface Preconfiguration {
  urlAnalytics: string;
  offline: boolean;
  urlSound: string;
  interceptorPhone: string[];
  showState: boolean;
  activeGeoLocalization: boolean;
}

export interface ApplicantProjectLayout {
  id: string;
  nameView: string;
  mainView: boolean;
  component: ComponentEntity[];
}

export enum ApplicantProjectStatus {
  ACTIVE,
  DISABLE,
}

export function createDefaultApplicantProject(): ApplicantProject {
  return {
    personalInformation: {
      showTypesData: [],
      locationInformation: undefined,
      urlImage: '',
      title: '',
    },
    appId: '',
    views: [],
    status: ApplicantProjectStatus.ACTIVE,
    preconfiguration: {
      activeGeoLocalization: false,
      interceptorPhone: [],
      offline: false,
      showState: false,
      urlAnalytics: '',
      urlSound: '',
    },
  };
}

export function createDefaultApplicantProjectLayout(): ApplicantProjectLayout {
  return {
    id: UUID.v4(),
    mainView: false,
    nameView: 'Vista 1',
    component: [],
  };
}

export interface UpdateJsonProjectLayout {
  id_application: number;
  json: string;
  language: string;
  status: ApplicantProjectStatus;
}

export function getJsonData(jsonProject: JsonProject): ApplicantProject {
  try {
    return JSON.parse(jsonProject.json);
  } catch (error) {
    console.error('Error al parsear el JSON:', error);
    return createDefaultApplicantProject();
  }
}

export interface QRConfig {
  body: string;
  eye: string;
  eyeBall: string;
  logo: string;
}

export interface QRCode {
  data: string;
  config: QRConfig;
  size: number;
  download: boolean;
  file: string;
}
