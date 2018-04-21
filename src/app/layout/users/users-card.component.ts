import { Component, Input, Output, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User} from './user.model';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromUsers from './store/user.reducers';
import * as UserActions from './store/user.actions';

//import { ICustomer } from '../shared/interfaces';
//import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  selector: 'app-users-card', 
  templateUrl: './users-card.component.html',
  styleUrls: [ './users-card.component.scss' ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UsersCardComponent implements OnInit {
  userState: Observable<fromUsers.State>;
  //@Input() customers: ICustomer[] = [];
  
  @Output() delete: EventEmitter<User> = new EventEmitter();
  @Output() edit: EventEmitter<User> = new EventEmitter();

  //constructor(/*public trackbyService: TrackByService*/) { }

  constructor(private store: Store<fromApp.AppState>) {       
  }
  
  ngOnInit() {
    this.userState = this.store.select('users');
  }

  onDeleteUser(user: User) {
    this.delete.emit(user);
  }

  onEditUser(user: User) {
    this.edit.emit(user);
  }
}
