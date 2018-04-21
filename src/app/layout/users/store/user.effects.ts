import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as UserActions from '../store/user.actions';
import { User } from '../user.model';
import { NewUser } from '../new-user.model';
import * as fromUser from '../store/user.reducers';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserEffects {
  @Effect()
  userFetch = this.actions$
    .ofType(UserActions.FETCH_USERS)
    .switchMap((action: UserActions.FetchUsers) => {
      return this.httpClient.get<User[]>(environment.apiUrl + 'users', {
        observe: 'body',
        responseType: 'json'
      })
    })
    .map(
      (users) => {
        console.log(users);
        return {
          type: UserActions.SET_USERS,
          payload: users
        };
      }
    );

  // @Effect({dispatch: false})
  // userStore = this.actions$
  //   .ofType(UserActions.STORE_USERS)
  //   .withLatestFrom(this.store.select('users'))
  //   .switchMap(([action, state]) => {
  //     const req = new HttpRequest('PUT', environment.apiUrl + 'users', state.users, {reportProgress: true});
  //     return this.httpClient.request(req);
  //   });

  @Effect()
  userTryDelete =  this.actions$
    .ofType<UserActions.TryDeleteUser>(UserActions.TRY_DELETE_USER)
    .map(action => action.payload)
    .mergeMap(payload => 
      this.httpClient.delete<User>(environment.apiUrl + 'users/' + payload.username, {
            observe: 'body',
            responseType: 'json',
          })
      .map(res => new UserActions.DeleteUser(res)) 
      .catch(error => of(new UserActions.DeleteFailureAction(error)))
   );
   
   @Effect()
   userTryUpdate =  this.actions$
     .ofType<UserActions.TryUpdateUser>(UserActions.TRY_UPDATE_USER)
     .map(action => action.payload)
     .mergeMap(payload => 
       this.httpClient.put<User>(environment.apiUrl + 'users/' + payload.username,  payload.updatedUser,
       {
          headers : {
            'Content-Type' : 'application/json'
          }
       })
       .map(res =>{ 
          this.router.navigate(['/users']);
          return new UserActions.UpdateUser(res)
      }) 
       .catch(error => of(new UserActions.DeleteFailureAction(error)))
    );

   @Effect()
   userTryAdd =  this.actions$
     .ofType<UserActions.StoreNewUser>(UserActions.STORE_NEW_USER)
     .map(action => action.payload)
     .mergeMap(payload => 
       this.httpClient.post<any>(environment.apiUrl + 'users/', payload,
           {
              headers : {
                'Content-Type' : 'application/json'
              }
           }
        )
       .map(res => {
         
         if (res.success) {
           this.router.navigate(['/users']);

         }
         return new UserActions.AddUser(res)})        
       .catch(error => of(new UserActions.AddUserFailure(error)))
    );



  //  @Effect({dispatch: false})
  //  recipeStore = this.actions$
  //    .ofType(UserActions.STORE_RECIPES)
  //    .withLatestFrom(this.store.select('recipes'))
  //    .switchMap(([action, state]) => {
  //      const req = new HttpRequest('PUT', 'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', state.recipes, {reportProgress: true});
  //      return this.httpClient.request(req);
  //    });

    // .switchMap((action: UserActions.TryDeleteUser) => {
    //   return this.httpClient.delete<User[]>(environment.apiUrl + 'users', {
    //     observe: 'body',
    //     responseType: 'json'
    //   }).map(x => {}).catch((y, z) => {});
    // })
    // .map(
    //   (users) => {
    //     console.log(users);
    //     return {
    //       type: UserActions.SET_USERS,
    //       payload: users
    //     };
    //   });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private router: Router,
              private store: Store<fromUser.FeatureState>) {}
}
