// Import model
import { Exercise } from '../exercise.model';

// Import ation types.
import { ExerciseActions, ExerciseActionTypes } from './exercise.actions';

// Import app reducers state.
import * as fromApp from '../../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  exercises: State
}

/**
 * The exercise state.
 * @interface State
 */
export interface State {
  // List of available exercise
  exercises: Exercise[];

  // True if failure occurs while adding a new exercise
  addFailure: boolean
}

/**
 * The initial state of the exercise state.
 */
const initialState: State = {
  exercises: [],
  addFailure: false
};


/**
 * The reducer function for exercise state.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function exerciseReducer(state: any = initialState, action: ExerciseActions) {
  switch (action.type) { 
    
    case ExerciseActionTypes.ADD_EXERCISE:
      return Object.assign({}, state, {
        exercises: [...state.exercises, action.payload],
        addFailure: false
      });    
    
    case ExerciseActionTypes.ADD_EXERCISE_FAILURE:
      return Object.assign({}, state, {
        addFailure: true
      });    

    case ExerciseActionTypes.DELETE_EXERCISE:
      {
        const exerciseIndex = state.exercises.findIndex(x => x._id == action.payload._id);
        const oldExercises = [...state.exercises] ;
        oldExercises.splice(exerciseIndex, 1);
        return Object.assign({}, state, {
            exercises: oldExercises,
          });    
      }

    // TODO (yanmas1): Validate if something relevant can be done here.
    case ExerciseActionTypes.DELETE_EXERCISE_FAILURE:
      return state;   
    

    case ExerciseActionTypes.UPDATE_EXERCISE:
      {
        const exerciseIndex = state.exercises.findIndex(x => x._id == action.payload._id);
        const oldExercise = state.exercises[exerciseIndex];
        const updatedExercise = {
          ...oldExercise,
          ...action.payload
        };
        const exercises = [...state.exercises];
        exercises[exerciseIndex] = updatedExercise;

        return Object.assign({}, state, {
            exercises: exercises
          });    
      }      
      
    // TODO (yanmas1): Validate if something relevant can be done here.
    case ExerciseActionTypes.UPDATE_EXERCISE_FAILURE:
      return state;   

    case ExerciseActionTypes.CACHE_FETCH_EXERCISES:
      return Object.assign({}, state, {
        exercises: [...action.payload]
      }); 
  
  default:
      return state;

  }
}