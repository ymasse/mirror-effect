
// Import model
import { Therapy } from '../therapy.model';
import { TherapyActor } from '../therapy-actor.model';
import { AvailableExercise } from '../available-exercise.model'

// Import ation types.
import { TherapyActions, TherapyActionTypes } from './therapy.actions'

// Import app reducers state.
import * as fromApp from '../../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  therapies: State
}

/**
 * The exercise state.
 * @interface State
 */
export interface State {
  // List of available exercise
  therapies: Therapy[];

  // List of available exercise for a therapy.
  availableExercises: AvailableExercise[];

  // True if failure occurs while adding a new exercise
  addFailure: boolean
}

/**
 * The initial state of the exercise state.
 */
const initialState: State = {
  therapies: [],
  availableExercises: [],
  addFailure: false
};


/**
 * The reducer function for therapies state.
 * @function reducer
 * @param {State} state Current state
 * @param {Actions} action Incoming action
 */
export function therapyReducer(state: any = initialState, action: TherapyActions) {

  switch (action.type) { 
    
    case TherapyActionTypes.ADD_THERAPY:
      return Object.assign({}, state, {
        therapies: [...state.therapies, action.payload],
        addFailure: false
      });    
    
    case TherapyActionTypes.ADD_THERAPY_FAILURE:
      return Object.assign({}, state, {
        addFailure: true
      });    

    case TherapyActionTypes.DELETE_THERAPY:
      {
        const therapyIndex = state.therapies.findIndex(x => x._id == action.payload._id);
        const oldTherapies = [...state.therapies] ;
        oldTherapies.splice(therapyIndex, 1);
        return Object.assign({}, state, {
            therapies: oldTherapies,
          });    
      }

    // TODO (yanmas1): Validate if something relevant can be done here.
    case TherapyActionTypes.DELETE_THERAPY_FAILURE:
      return state;   
    

    case TherapyActionTypes.UPDATE_THERAPY:
      {
        const therapyIndex = state.therapies.findIndex(x => x._id == action.payload._id);
        const oldExercise = state.therapies[therapyIndex];
        const updatedExercise = {
          ...oldExercise,
          ...action.payload
        };
        const therapies = [...state.therapies];
        therapies[therapyIndex] = updatedExercise;

        return Object.assign({}, state, {
            therapies: therapies
          });    
      }      
      
    // TODO (yanmas1): Validate if something relevant can be done here.
    case TherapyActionTypes.UPDATE_THERAPY_FAILURE:
      return state;   

    case TherapyActionTypes.CACHE_FETCH_THERAPIES:
      return Object.assign({}, state, {
        therapies: [...action.payload]
      }); 
    case TherapyActionTypes.CACHE_FETCH_EXERCISES:
    return Object.assign({}, state, {
      availableExercises: [...action.payload] 
    });
  
  default:
      return state;

  }
}