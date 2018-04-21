import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';


import { routerTransition } from '../../../router.animations';

import { Therapy } from '../therapy.model';

import * as fromApp from '../../../store/app.reducers';
import * as fromTherapies from '../store/therapy.reducers';
import * as TherapyActions from '../store/therapy.actions';


@Component({
  selector: 'app-therapy',
  templateUrl: './therapy.component.html',
  styleUrls: ['./therapy.component.scss',],
  animations: [routerTransition()]

})
export class TherapyComponent implements OnInit {

  constructor(private translate: TranslateService, private store: Store<fromApp.AppState>) { }
  therapyState: Observable<fromTherapies.State>;

  ngOnInit() {
    this.store.dispatch(new TherapyActions.FetchTherapies());
    this.store.dispatch(new TherapyActions.FetchExercises());
  }

}
