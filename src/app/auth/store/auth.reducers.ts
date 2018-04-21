import { AuthActions, AuthActionTypes}  from './auth.actions';
import { User } from "../../layout/users/user.model";
export interface State {
  token: string;
  authenticated: boolean;
  user: User

}

const initialState: State = {
  token: null,
  authenticated: false,
  user: null

};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case (AuthActionTypes.SIGNUP):
    case (AuthActionTypes.SIGNIN):
      return Object.assign({}, state, {
        ...state,
        authenticated: true
      });

    case (AuthActionTypes.LOGOUT):
      return Object.assign({}, state, {
        ...state,
        token: null,
        authenticated: false,
        user: null
      });
    case (AuthActionTypes.SET_TOKEN):
      return  Object.assign({}, state,{
        ...state,
        token: action.payload.token      
      });
    case (AuthActionTypes.AUTHENTICATE_SUCCESS):
     return  Object.assign({}, state,{
        ...state,
        authenticated: true,
        token: action.payload.token,
        user: action.payload.user
     });
    default:
      return state;
  }
}
