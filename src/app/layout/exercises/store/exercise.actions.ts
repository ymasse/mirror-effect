import { Action } from '@ngrx/store';

import { Exercise }  from '../exercise.model';
// import type function
import { type } from "../../../shared/util";

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const TRY_ADD_EXERCISE = 'TRY_ADD_EXERCISE';
export const ADD_EXERCISE_FAILURE = 'ADD_EXERCISE_FAILURE';

export const DELETE_EXERCISE = 'DELETE_EXERCISE';
export const TRY_DELETE_EXERCISE = 'TRY_DELETE_EXERCISE';
export const DELETE_EXERCISE_FAILURE = 'DELETE_EXERCISE_FAILURE';

export const UPDATE_EXERCISE = 'UPDATE EXERCISE';
export const TRY_UPDATE_EXERCISE = 'TRY_UPDATE_EXERCISE'
export const UPDATE_EXERCISE_FAILURE = 'UPDATE_EXERCISE_FAILURE';

export const FETCH_EXERCISES = 'FETCH_EXERCISES';

export const ExerciseActionTypes = {  
  ADD_EXERCISE: type('ADD_EXERCISE'),
  TRY_ADD_EXERCISE : type('TRY_ADD_EXERCISE'),
  ADD_EXERCISE_FAILURE: type('ADD_EXERCISE_FAILURE'),
  DELETE_EXERCISE: type('DELETE_EXERCISE'),
  TRY_DELETE_EXERCISE: type('TRY_DELETE_EXERCISE'),
  DELETE_EXERCISE_FAILURE: type('DELETE_EXERCISE_FAILURE'),  
  UPDATE_EXERCISE: type('UPDATE EXERCISE'),
  TRY_UPDATE_EXERCISE: type('TRY_UPDATE_EXERCISE'),
  UPDATE_EXERCISE_FAILURE: type('UPDATE_EXERCISE_FAILURE'),  
  FETCH_EXERCISES: type('FETCH_EXERCISES'),
  CACHE_FETCH_EXERCISES: type('CACHE_FETCH_EXERCISES')
}


export class AddExercise implements Action {
  readonly type: string = ExerciseActionTypes.ADD_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class CacheFetchExercises implements Action {
  readonly type: string = ExerciseActionTypes.CACHE_FETCH_EXERCISES;

  constructor(public payload: Exercise[]) {}
}

export class TryAddExercise implements Action {
  readonly type: string = ExerciseActionTypes.TRY_ADD_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class AddExerciseFailure implements Action {
  readonly type = ExerciseActionTypes.ADD_EXERCISE_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteExercise implements Action {
  readonly type: string = ExerciseActionTypes.DELETE_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class TryDeleteExercise implements Action {
  readonly type: string = ExerciseActionTypes.TRY_DELETE_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class DeleteExerciseFailure implements Action {
  readonly type: string = ExerciseActionTypes.DELETE_EXERCISE_FAILURE;
  constructor(public payload?: any) {}
}

export class UpdateExercise implements Action {
  readonly type: string = ExerciseActionTypes.UPDATE_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class TryUpdateExercise implements Action {
  readonly type: string = ExerciseActionTypes.TRY_UPDATE_EXERCISE;

  constructor(public payload: Exercise) {}
}

export class UpdateExerciseFailure implements Action {
  readonly type: string = ExerciseActionTypes.UPDATE_EXERCISE_FAILURE;
  constructor(public payload?: any) {}
}

export class FetchExercises implements Action {
  readonly type: string = ExerciseActionTypes.FETCH_EXERCISES;
  constructor(public payload?: any) {}

}


export type ExerciseActions = 
  AddExercise |
  TryAddExercise |  
  AddExerciseFailure |
  DeleteExercise |
  DeleteExerciseFailure |
  UpdateExercise |
  FetchExercises |
  CacheFetchExercises;