import {
  ModuleUserInformation,
  UserItem,
  UserRolItem,
} from '@amad-web-admin/modules/network';
import { EntityState } from '@ngrx/entity';

export interface UserState extends EntityState<UserItem> {
  selectedUserItem: ModuleUserInformation | null;
}

export type UserRolState = EntityState<UserRolItem>;

export interface UserAppState {
  loader: boolean;
  error: any;
  userState: UserState;
  userRolesState: UserRolState;
  anySuccess: any;
}
