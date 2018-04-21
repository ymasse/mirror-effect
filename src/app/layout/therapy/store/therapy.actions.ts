import { Action } from '@ngrx/store';

import { Therapy }  from '../therapy.model';
import { TherapyActor } from '../therapy-actor.model';
import { NewTherapy } from '../new-therapy.model';

// import type function
import { type } from "../../../shared/util";
import { Therapist } from '../patient.model';
import { AvailableExercise } from '../available-exercise.model';

export const TherapyActionTypes = {  
  ADD_THERAPY: type('ADD_THERAPY'),
  TRY_ADD_THERAPY : type('TRY_ADD_THERAPY'),
  ADD_THERAPY_FAILURE: type('ADD_THERAPY_FAILURE'),
  DELETE_THERAPY: type('DELETE_THERAPY'),
  TRY_DELETE_THERAPY: type('TRY_DELETE_THERAPY'),
  DELETE_THERAPY_FAILURE: type('DELETE_THERAPY_FAILURE'),  
  UPDATE_THERAPY: type('UPDATE_THERAPY EXERCISE'),
  TRY_UPDATE_THERAPY: type('TRY_UPDATE_THERAPY'),
  UPDATE_THERAPY_FAILURE: type('UPDATE_THERAPY_FAILURETRY_UPDATE_THERAPY'),  
  FETCH_THERAPIES: type('FETCH_THERAPIES'),
  CACHE_FETCH_THERAPIES: type('CACHE_FETCH_THERAPIES'),
  FETCH_EXERCISES: type('FETCH_AVAILABLE_EXERCISES'),
  CACHE_FETCH_EXERCISES: type('CACHE_FETCH_AVAILABLE_EXERCISES')
}


export class AddTherapy implements Action {
  readonly type: string = TherapyActionTypes.ADD_THERAPY;

  constructor(public payload: Therapy) {}
}

export class TryAddTherapy implements Action {
  readonly type: string = TherapyActionTypes.TRY_ADD_THERAPY;

  constructor(public payload: NewTherapy) {}
}

export class AddTherapyFailure implements Action {
  readonly type = TherapyActionTypes.ADD_THERAPY_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteTherapy implements Action {
  readonly type: string = TherapyActionTypes.DELETE_THERAPY;

  constructor(public payload: Therapy) {}
}

export class TryDeleteTherapy implements Action {
  readonly type: string = TherapyActionTypes.TRY_DELETE_THERAPY;

  constructor(public payload: Therapy) {}
}

export class DeleteTherapyFailure implements Action {
  readonly type: string = TherapyActionTypes.DELETE_THERAPY_FAILURE;
  constructor(public payload?: any) {}
}

export class UpdateTherapy implements Action {
  readonly type: string = TherapyActionTypes.UPDATE_THERAPY;

  constructor(public payload: Therapy) {}
}

export class TryUpdateTherapy implements Action {
  readonly type: string = TherapyActionTypes.TRY_UPDATE_THERAPY;

  constructor(public payload: Therapy) {}
}

export class UpdateTherapyFailure implements Action {
  readonly type: string = TherapyActionTypes.UPDATE_THERAPY_FAILURE;
  constructor(public payload?: any) {}
}

export class FetchTherapies implements Action {
  readonly type: string = TherapyActionTypes.FETCH_THERAPIES;
  constructor(public payload?: any) {}

}

export class CacheFetchTherapies implements Action {
  readonly type: string = TherapyActionTypes.CACHE_FETCH_THERAPIES;

  constructor(public payload: Therapy[]) {}
}

export class FetchExercises implements Action {
  readonly type: string = TherapyActionTypes.FETCH_EXERCISES;

  constructor(public payload?: any) {}
}

export class CacheFetchExercises implements Action {
  readonly type: string = TherapyActionTypes.CACHE_FETCH_EXERCISES;

  constructor(public payload: AvailableExercise[]) {}
}

export type TherapyActions = 
  AddTherapy |
  TryAddTherapy |  
  AddTherapyFailure |
  DeleteTherapy |
  TryDeleteTherapy |
  DeleteTherapyFailure |
  UpdateTherapy |
  TryUpdateTherapy |
  UpdateTherapyFailure | 
  FetchTherapies |
  CacheFetchTherapies|
  FetchExercises |
  CacheFetchExercises;