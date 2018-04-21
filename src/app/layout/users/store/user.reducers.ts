import { User } from '../user.model';
import * as UserActions from './user.actions';
import * as fromApp from '../../../store/app.reducers';
import { AddUserFailure } from './user.actions';

export interface FeatureState extends fromApp.AppState {
  users: State
}

export interface State {
  users: User[];
  addFailure: boolean;
}

const initialState: State = {
  users: [],
  addFailure: false
};

export function userReducer(state: any = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case (UserActions.SET_USERS):
      return {
        ...state,
        users: [...action.payload]
      };
    case (UserActions.ADD_USER):
      return {
        ...state,
        users: [...state.users, action.payload],
        addFailure: false
      };
    case (UserActions.ADD_USER_FAILURE):
      return {
        ...state,        
        addFailure: true
      };
    case (UserActions.UPDATE_USER):
      {
        const userIndex = state.users.findIndex(x => x.username == action.payload.username);
        const oldUser = state.users[userIndex];
        const updatedUser = {
          ...oldUser,
          ...action.payload
        };
        const users = [...state.users];
        users[userIndex] = updatedUser;
        return {
          ...state,
          users: users
        };
      }
    case (UserActions.DELETE_USER):
      {
        const userIndex = state.users.findIndex(x => x.username == action.payload.username);
        const oldUsers = [...state.users];
        oldUsers.splice(userIndex, 1);
        return {
          ...state,
          users: oldUsers
        };
      }
    default:
      return state;
  }
}
