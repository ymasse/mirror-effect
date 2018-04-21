import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";

//import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable'
import { Action } from "@ngrx/store";
import { User } from '../../layout/users/user.model';


import {  map, mergeMap, catchError } from 'rxjs/operators';


import { fromPromise } from 'rxjs/observable/fromPromise';
//import * as firebase from 'firebase';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  /**
   * Authenticate user.
   * @method authenticate
   */
  @Effect()
  public authenticate: Observable<Action> = this.actions$
    .ofType(AuthActions.AuthActionTypes.AUTHENTICATE)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.httpClient.post<{token: string, success: boolean, user: any}>(environment.apiUrl + 'auth/signin', payload,
        {observe: 'response'})
              .map(res => {
                return new AuthActions.AuthenticationSuccessAction({token: res.body.token, user: res.body.user })
              })
              .catch(error => Observable.of(new AuthActions.AuthenticationErrorAction({error: error})));
    });

      /**
   * Authenticate user.
   * @method authenticate
   */

  @Effect({dispatch: false})
  public authenticateSuccess: Observable<Action> = this.actions$
    .ofType(AuthActions.AuthActionTypes.AUTHENTICATE_SUCCESS)
    .map(toPayload)
    .do((payload) => {    
      if (payload.user.role == "patient") {
        this.router.navigate(['../therapy-session']);
      } else {
        this.router.navigate(['/']);
      }
    });


  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.AuthActionTypes.LOGOUT)
    // TODO (yanmas1): Implement the logout on the server.
    //.switchMap(() => {
    //  return fromPromise(firebase.auth().signOut());
    //})
    .do(() => {      
      this.router.navigate(['/auth/signin']);
    });

  constructor(private actions$: Actions,
      private httpClient: HttpClient,
      private router: Router) {
  }
}
