import { GoogleCodeToken } from '../google-code-token';
import { UserInformation } from '@amad-web-admin/shared';

export interface AuthenticationEntity {
  userInformation: UserInformation | null;
  error: unknown;
  showGoogleCode: GoogleCodeToken | null;
  loaded: boolean;
}
