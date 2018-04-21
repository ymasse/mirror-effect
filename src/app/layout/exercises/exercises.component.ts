import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import {Exercise} from './exercise.model';

import * as fromApp from '../../store/app.reducers';
import * as fromExercises from './store/exercise.reducers';
import * as ExerciseActions from './store/exercise.actions';

// FROM : Erase if not required.
// https://github.com/DanWahlin/Angular-JumpStart/blob/master/src/app/customers/customers-routing.module.ts
//https://blog.codewithdan.com/2017/02/08/10-angular-and-typescript-projects-to-take-you-from-zero-to-hero/

@Component({
    selector: 'app-exercises',
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss'],
    animations: [routerTransition()]
})
export class ExercisesComponent implements OnInit {


  title: string = "Usagers";

  exerciseState: Observable<fromExercises.State>;
  constructor(private translate: TranslateService, private store: Store<fromApp.AppState>) {       
  }

  ngOnInit() {
    this.title = 'Exercises';

    this.store.dispatch(new ExerciseActions.FetchExercises());
  }
}
