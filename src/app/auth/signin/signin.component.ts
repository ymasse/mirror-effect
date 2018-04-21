import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [routerTransition()]
})
export class SigninComponent implements OnInit {  

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.AuthenticateAction({username: username, password: password}));
  }

}
