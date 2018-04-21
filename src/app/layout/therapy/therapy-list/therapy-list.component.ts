import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import { Therapy } from '../therapy.model';
import { TherapyActor } from '../therapy-actor.model';
import { User } from '../../users/user.model';

// Therapy Store Import
import * as fromApp from '../../../store/app.reducers';
import * as TherapyActions from '../store/therapy.actions';
import * as fromTherapies from '../store/therapy.reducers';
import { therapyReducer } from '../store/therapy.reducers';

@Component({
  selector: 'app-therapy-list',
  templateUrl: './therapy-list.component.html',
  styleUrls: ['./therapy-list.component.scss']
})
export class TherapyListComponent implements OnInit {
  therapyState: Observable<fromTherapies.State>;
  currentUser: User = null;
  @Output() delete: EventEmitter<Therapy> = new EventEmitter();
  @Output() edit: EventEmitter<Therapy> = new EventEmitter();

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.therapyState = this.store.select('therapies');
    this.store.select('auth').take(1).subscribe(x => {
        this.currentUser = x.user;
    })
  }

  onDeleteTherapy(therapy: Therapy) {
    this.delete.emit(therapy);
  }

  onEditTherapy(therapy: Therapy) {
    this.edit.emit(therapy);
  }



}
