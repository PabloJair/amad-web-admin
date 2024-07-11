import { EntityState } from '@ngrx/entity';
import { UserRolItem } from '@amad-web-admin/modules/network';

export type RolesState = EntityState<UserRolItem>;

export interface UserRolAppState {
  loader: boolean;
  error: any;
  rolesState: RolesState;
  anySuccess: any;
}
