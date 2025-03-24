import { EntityState } from '@ngrx/entity';
import { ModuleUserInformation, UserItem, UserRolItem } from '@amad-web-admin/shared';

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
