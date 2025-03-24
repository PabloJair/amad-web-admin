import { TypeInputPersonalInformation } from './type-input-personal-information';
import { LocationConfiguration } from './location-configuration';

export interface PersonalInformation {
  showTypesData: TypeInputPersonalInformation[];
  locationInformation: LocationConfiguration | null;
  urlImage: string;
  title: string;
  active: boolean;
}
