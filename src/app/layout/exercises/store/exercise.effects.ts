import { Injectable } from "@angular/core";

// import @ngrx
import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Store, Action } from "@ngrx/store";

// import rxjs
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// import Http types
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

// State imports
import * as fromExercise from './exercise.reducers';

// Model imports
import { Exercise } from '../exercise.model';

// Application configuration imports
import { environment } from '../../../../environments/environment';


// import actions
import {
  ExerciseActionTypes,
  ExerciseActions,
  AddExercise,  
  TryAddExercise,
  AddExerciseFailure,
  TryUpdateExercise,
  UpdateExercise,
  UpdateExerciseFailure,
  TryDeleteExercise,
  DeleteExercise,
  DeleteExerciseFailure
} from "./exercise.actions";


@Injectable()
export class ExerciseEffects {

  @Effect()
  exerciseFetch = this.actions$
    .ofType(ExerciseActionTypes.FETCH_EXERCISES)
    .map(toPayload)
    .switchMap(payload =>  {
      return this.httpClient.get<Exercise[]>(environment.apiUrl + 'exercises', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map(
      (exercises) => {
        console.log(exercises);
        return {
          type: ExerciseActionTypes.CACHE_FETCH_EXERCISES,
          payload: exercises
        };
      }
    );

  @Effect()
  exerciseTryDelete =  this.actions$
    .ofType(ExerciseActionTypes.TRY_DELETE_EXERCISE)
    .map(toPayload)
    .mergeMap(payload => 
      this.httpClient.delete<Exercise>(environment.apiUrl + 'exercises/' + payload._id, {
            observe: 'body',
            responseType: 'json',
          })
      .map(res => new DeleteExercise(res)) 
      .catch(error => of(new DeleteExerciseFailure(error)))
  );

  @Effect()
  exerciseTryAdd =  this.actions$
    .ofType(ExerciseActionTypes.TRY_ADD_EXERCISE)
    .map(toPayload)
    .mergeMap(payload => 
      this.httpClient.post<Exercise>(environment.apiUrl + 'exercises/' , payload, {
            headers : {
              'Content-Type' : 'application/json'
            }
          })
      .map(res => new AddExercise(res)) 
      .catch(error => of(new AddExerciseFailure(error)))
  );

  @Effect()
  exerciseTryUpdate =  this.actions$
    .ofType(ExerciseActionTypes.TRY_UPDATE_EXERCISE)
    .map(toPayload)
    .mergeMap(payload => 
      this.httpClient.put<{message: string, exercise: Exercise}>(environment.apiUrl + 'exercises/' + payload._id, payload, {
            headers : {
              'Content-Type' : 'application/json'
            }
          })
      .map(res => new UpdateExercise(res.exercise)) 
      .catch(error => of(new AddExerciseFailure(error)))
  );


  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromExercise.FeatureState>) {}

}