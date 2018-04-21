import { Component, Input, Output, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User} from './../user.model';

//import { ICustomer } from '../shared/interfaces';
//import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  selector: 'app-users-card-item', 
  templateUrl: './users-card-item.component.html',
  styleUrls: [ './users-card-item.component.scss' ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UsersCardItemComponent implements OnInit {
  @Input() user: User;
  @Output() delete: EventEmitter<User> = new EventEmitter();
  @Output() edit: EventEmitter<User> = new EventEmitter();

  //constructor(/*public trackbyService: TrackByService*/) { }

  constructor() {       
  }
  
  ngOnInit() {  
      
  }

  onDeleteUser() {
    this.delete.emit(this.user);
  }

  onEditUser() {
    this.edit.emit(this.user);
  }
}
