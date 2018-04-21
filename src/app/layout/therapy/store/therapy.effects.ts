import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

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
import * as fromTherapies from './therapy.reducers';

// Model imports
import { Therapy } from '../therapy.model';
import { TherapyActor} from '../therapy-actor.model'

// Application configuration imports
import { environment } from '../../../../environments/environment';


// import actions
import {
  TherapyActionTypes,
  TherapyActions,
  TryAddTherapy,
  AddTherapy,
  TryUpdateTherapy,
  UpdateTherapy,
  UpdateTherapyFailure,
  TryDeleteTherapy,
  DeleteTherapy,
  DeleteTherapyFailure,
  AddTherapyFailure
} from "./therapy.actions";
import { AvailableExercise } from "../available-exercise.model";


@Injectable()
export class TherapyEffects {

  @Effect()
  therapyFetch = this.actions$
    .ofType(TherapyActionTypes.FETCH_THERAPIES)
    .map(toPayload)
    .switchMap(payload =>  {
      return this.httpClient.get<Therapy[]>(environment.apiUrl + 'therapy', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map(
      (therapies) => {
        console.log(therapies);
        return {
          type: TherapyActionTypes.CACHE_FETCH_THERAPIES,
          payload: therapies
        };
      }
    );

    @Effect()
    exercisesFetch = this.actions$
      .ofType(TherapyActionTypes.FETCH_EXERCISES)
      .map(toPayload)
      .switchMap(payload =>  {
        return this.httpClient.get<AvailableExercise[]>(environment.apiUrl + 'exercises', {
          observe: 'body',
          responseType: 'json'
        })
      })
        .map(
        (exercises) => {
          console.log(exercises);
          return {
            type: TherapyActionTypes.CACHE_FETCH_EXERCISES,
            payload: exercises
          };
        }
      );

  @Effect()
  therapyTryDelete =  this.actions$
    .ofType(TherapyActionTypes.TRY_DELETE_THERAPY)
    .map(toPayload)
    .mergeMap(payload => 
      this.httpClient.delete<Therapy>(environment.apiUrl + 'therapy/' + payload._id, {
            observe: 'body',
            responseType: 'json',
          })
      .map(res => new DeleteTherapy(res)) 
      .catch(error => of(new DeleteTherapyFailure(error)))
  );

  @Effect()
  therapyTryToAdd =  this.actions$
    .ofType(TherapyActionTypes.TRY_ADD_THERAPY)
    .map(toPayload)
    .mergeMap(payload => 
      this.httpClient.post<Therapy>(environment.apiUrl + 'therapy/' , payload, {
            headers : {
              'Content-Type' : 'application/json'
            }
          })
      .map(res => {
        
          this.router.navigate(['/therapies']);
          return new AddTherapy(res);
        }
      ) 
      .catch(error => of(new AddTherapyFailure(error)))
  );

  @Effect()
  therapyTryUpdate =  this.actions$
    .ofType(TherapyActionTypes.TRY_UPDATE_THERAPY)
    .map(toPayload)
    .mergeMap(payload => 
      this.httpClient.put<{message: string, therapy: Therapy}>(environment.apiUrl + 'therapy/' + payload._id, payload, {
            headers : {
              'Content-Type' : 'application/json'
            }
          })
      .map(res => new UpdateTherapy(res.therapy)) 
      .catch(error => of(new AddTherapyFailure(error)))
  );


  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<fromTherapies.FeatureState>) {}

}