import { Component, Input, Output, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Exercise } from '../exercise.model';
import { User } from '../../users/user.model';

import { ExerciseEditPopupComponent } from '../exercise-edit-popup/exercise-edit-popup.component';
import { ExerciseConfirmPopupComponent } from '../exercise-confirm-popup/exercise-confirm-popup.component';

import * as fromApp from '../../../store/app.reducers';
import * as ExerciseActions from '../../exercises/store/exercise.actions';
import * as fromExercises from '../store/exercise.reducers';
import * as fromAuth from '../../../auth/store/auth.reducers';
import { exerciseReducer } from '../store/exercise.reducers';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
//import { authReducer} from '../../../auth/store/auth.reducers';

//import { ICustomer } from '../shared/interfaces';
//import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  selector: 'app-exercise-list', 
  templateUrl: './exercise-list.component.html',
  styleUrls: [ './exercise-list.component.scss' ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ExerciseListComponent implements OnInit {
  exerciseState: Observable<fromExercises.State>;
  currentUser: User = null;
  //@Input() customers: ICustomer[] = [];
  
  //@Output() delete: EventEmitter<Exercise> = new EventEmitter();
  //@Output() edit: EventEmitter<Exercise> = new EventEmitter();

  
  constructor(private store: Store<fromApp.AppState>,    
    private modalService: NgbModal) {       
  }
  
  ngOnInit() {
    this.exerciseState = this.store.select('exercises');
    this.store.select('auth').take(1).subscribe(x => {
        this.currentUser = x.user;
    })
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  onDeleteExercise(exercise: Exercise) {
    const modalRef = this.modalService.open(ExerciseConfirmPopupComponent);
    modalRef.result.then((response) => {
      if (response === true) {
        this.store.dispatch(new ExerciseActions.TryDeleteExercise(exercise))
      }
    }).catch((ex) => {
      console.error('Error fetching users', ex);
    });    
  }

  onRefresh() {
    this.store.dispatch(new ExerciseActions.FetchExercises());
  }

  onEditExercise(exercise: Exercise) {
    const modalRef = this.modalService.open(ExerciseEditPopupComponent);
    modalRef.componentInstance.username = this.currentUser.username;
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.exercise = exercise;
    modalRef.result.then((response) => {

        if (!response.cancel) {
          this.store.dispatch(new ExerciseActions.TryUpdateExercise(response.exercise))
        }
    });
    
  }

  onAddExercise() {
    const modalRef = this.modalService.open(ExerciseEditPopupComponent);
    modalRef.componentInstance.username = this.currentUser.username;
    modalRef.componentInstance.editMode = false;
    modalRef.componentInstance.exercise = null;
    // modalRef.componentInstance.fullname.name = user.first_name + " " + user.last_name;
    modalRef.result.then((response) => {

        if (!response.cancel) {
          this.store.dispatch(new ExerciseActions.TryAddExercise(response.exercise))
        }
    });
  }
}
