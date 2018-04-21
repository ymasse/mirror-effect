import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    return this.store.select('auth')
      .take(1)
      .switchMap((authState: fromAuth.State) => {

        if (authState.authenticated) {
      
          // // add a custom header
          // const copiedReq = req.clone({
          //   headers: req.headers.set('Authorization', authState.token)
          // });

          // const copiedReq = req.clone({
          //   setHeaders: {
          //     Authorization: `JWT ${authState.token}`
          //   }});

            // const headers = new HttpHeaders({
            //   'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaXNBZG1pbiI6dHJ1ZSwiZW1haWwiOiJ5bWFzc2VAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiQWRtaW4iLCJsYW5ndWFnZSI6ImZyIiwiaWF0IjoxNTE5Njk4MzAwfQ.hXwSV0dXdOjDkPHstp8bUAHjqetqfi13S4xhumVIHQw',
            //   'Content-Type': 'application/json'
            // });
            
        
            // const cloneReq = req.clone({headers});
            const cloneReq = req.clone({
              setHeaders: {
                Accept: 'application/json',
                Authorization: `${authState.token}`
              }
            });
            //const cloneReq = req.clone({params: req.params.set('auth', authState.token)});
            return next.handle(cloneReq);
         
        //return next.handle(cloneReq);
        } 

        return next.handle(req.clone());
      })

    // return null;
  }
}
