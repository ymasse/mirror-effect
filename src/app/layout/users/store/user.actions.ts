import { Action } from '@ngrx/store';

import { User } from '../user.model';
import { NewUser } from '../new-user.model';



export const SET_USERS = 'SET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const TRY_DELETE_USER = 'TRY_DELETE_USER';
export const TRY_UPDATE_USER = 'TRY_UPDATE_USER';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_FAILURE = 'DELETE_FAILURE';
export const STORE_USERS = 'STORE_USERS';
export const STORE_NEW_USER = 'STORE_NEW_USER';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const ADD_USER_CANCEL = 'ADD_USER_CANCEL';
export const FETCH_USERS = 'FETCH_USERS';

export class SetUsers implements Action {
  readonly type = SET_USERS;

  constructor(public payload: User[]) {}
}

export class AddUser implements Action {
  readonly type = ADD_USER;

  constructor(public payload: User) {}
}

export class StoreNewUser implements Action {
  readonly type = STORE_NEW_USER;

  constructor(public payload: NewUser) {}
}

export class TryUpdateUser implements Action {
  readonly type = TRY_UPDATE_USER;

  constructor(public payload:  {username: string, updatedUser: User}) {}
}


export class AddUserFailure implements Action {
  readonly type = ADD_USER_FAILURE;
  constructor(public payload: any) {}
}

export class AddUserCancel implements Action {
  readonly type = ADD_USER_CANCEL;
  constructor(public payload: any) {}
}


export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateUserFailure implements Action {
  readonly type = UPDATE_USER_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;

  constructor(public payload: User) {}
}

export class TryDeleteUser implements Action {
  readonly type = TRY_DELETE_USER;

  constructor(public payload: User) {}
}

export class StoreUsers implements Action {
  readonly type = STORE_USERS;
}

export class FetchUsers implements Action {
  readonly type = FETCH_USERS;
}

export class DeleteFailureAction implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: any) {}
}

export type UserActions = SetUsers |
  AddUser |
  StoreNewUser |
  AddUserFailure |
  UpdateUser |
  TryUpdateUser |
  UpdateUserFailure |
  UpdateUser |
  DeleteUser |
  TryDeleteUser |
  DeleteFailureAction |
  StoreUsers |
  FetchUsers;
