import { Action } from '@ngrx/store';

// import models
import { User } from "../../layout/users/user.model";

export const AuthActionTypes = {
  TRY_SIGNUP:'TRY_SIGNUP',
  SIGNUP:'SIGNUP',
  TRY_SIGNIN:'TRY_SIGNIN',
  SIGNIN:'SIGNIN',
  LOGOUT:'LOGOUT',
  SET_TOKEN:'SET_TOKEN',
  GET_SIGNIN_STATUS:"GET_SIGNIN_STATUS",
  SIGNIN_FAILURE:"SIGNIN_FAILURE",
  AUTHENTICATE:'AUTHENTICATE',
  AUTHENTICATE_SUCCESS:'AUTHENTICATE_SUCCESS',
  AUTHENTICATE_ERROR:'AUTENTICATE_ERROR',
};

export class TrySignup implements Action {
  readonly type = AuthActionTypes.TRY_SIGNUP;

  constructor(public payload: {username: string, password: string}) {}
}

export class TrySignin implements Action {
  readonly type = AuthActionTypes.TRY_SIGNIN;

  constructor(public payload: {username: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class Signin implements Action {
  readonly type = AuthActionTypes.SIGNIN;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor(public payload: any) {}
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SET_TOKEN;

  constructor(public payload: {token: string}) {}
}

export class GetSigninStatus implements Action {
  readonly type = AuthActionTypes.GET_SIGNIN_STATUS;
  constructor(public payload: any) {}
}

export class SigninFailure implements Action {
  readonly type = AuthActionTypes.SIGNIN_FAILURE;
  constructor(public payload: any) {}
}

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action}
 */
export class AuthenticateAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATE;

  constructor(public payload: {username: string, password: string}) {}
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action}
 */
export class AuthenticationErrorAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATE_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action}
 */
export class AuthenticationSuccessAction implements Action {
  public type: string = AuthActionTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: { token: string, user: User }) {}
}


export type AuthActions = Signup | 
Signin | 
Logout | 
SetToken | 
TrySignup | 
TrySignin | 
GetSigninStatus | 
SigninFailure |
AuthenticateAction |
AuthenticationSuccessAction |
AuthenticationErrorAction;
