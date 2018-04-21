import { ActionReducerMap } from '@ngrx/store';

//import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import * as fromUsers from '../layout/users/store/user.reducers';
import * as fromExercises from '../layout/exercises/store/exercise.reducers';
import * as fromTherapies from '../layout/therapy/store/therapy.reducers';

export interface AppState {
  auth: fromAuth.State,
  users: fromUsers.State,
  exercises: fromExercises.State,
  therapies: fromTherapies.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  users: fromUsers.userReducer,
  exercises: fromExercises.exerciseReducer,
  therapies: fromTherapies.therapyReducer
};
