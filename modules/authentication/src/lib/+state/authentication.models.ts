import { UserInformation } from '@amad-web-admin/modules/network';
import { GoogleCodeToken } from '../google-code-token';

export interface AuthenticationEntity {
  userInformation: UserInformation | null;
  error: unknown;
  showGoogleCode: GoogleCodeToken | null;
  loaded: boolean;
}
