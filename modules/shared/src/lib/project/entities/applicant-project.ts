import { View } from './View';
import * as UUID from 'uuid';
import { ApplicantProjectStatus } from './applicant-project-status';
import { Preconfiguration } from './preconfiguration';
import { PersonalInformation } from './personal-information';

export interface ApplicantProject {
  status: ApplicantProjectStatus;
  appId: string;
  preconfiguration: Preconfiguration;
  views: View[];
  personalInformation?: PersonalInformation;
}

export function createDefaultApplicantProject(): ApplicantProject {
  return {
    personalInformation: {
      showTypesData: [],
      locationInformation: null,
      urlImage: '',
      title: '',
      active: false,
    },
    appId: '',
    views: [],
    status: ApplicantProjectStatus.ACTIVE,
    preconfiguration: {
      tagAnalyticOpen: '',
      activeGeoLocalization: false,
      interceptorPhone: [],
      offline: false,
      showState: false,
      welcomeVideo: '',
      urlAnalytics: '',
      urlSound: '',
    },
  };
}

export function createDefaultApplicantProjectLayout(): View {
  return {
    id: UUID.v4(),
    mainView: false,
    nameView: 'Vista 1',
    properties: null,
    component: [],
  };
}
