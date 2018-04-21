import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import {User} from './user.model';

import * as fromApp from '../../store/app.reducers';
import * as fromUsers from './store/user.reducers';
import * as UserActions from './store/user.actions';

// FROM : Erase if not required.
// https://github.com/DanWahlin/Angular-JumpStart/blob/master/src/app/customers/customers-routing.module.ts
//https://blog.codewithdan.com/2017/02/08/10-angular-and-typescript-projects-to-take-you-from-zero-to-hero/

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})
export class UsersComponent implements OnInit {


  title: string = "Usagers";

  userState: Observable<fromUsers.State>;
  constructor(private translate: TranslateService, private store: Store<fromApp.AppState>) {       
  }

  ngOnInit() {
    this.title = 'Usagers ';
  }
}
