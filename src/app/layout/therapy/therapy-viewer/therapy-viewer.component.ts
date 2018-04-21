import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Therapy } from '../therapy.model';

import * as fromApp from '../../../store/app.reducers';
import * as fromTherapies from '../store/therapy.reducers';
import * as TherapyActions from '../store/therapy.actions';

import { therapyReducer } from '../store/therapy.reducers';


@Component({
  selector: 'app-therapy-viewer',
  templateUrl: './therapy-viewer.component.html',
  styleUrls: ['./therapy-viewer.component.scss']
})
export class TherapyViewerComponent implements OnInit {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,) { }

  ngOnInit() {
  }

  onAddTherapy() {

  }

  onRefresh() {
    this.store.dispatch(new TherapyActions.FetchTherapies());

  }

  onDeleteTherapy(therapy: Therapy ){
    // const modalRef = this.modalService.open(UserDeletePopupComponent);
    // modalRef.componentInstance.fullname.name = user.first_name + " " + user.last_name;
    // modalRef.result.then((response) => {
    //   if (response === 'Yes') {
    //     this.store.dispatch(new UserActions.TryDeleteUser(user))
    //   }
    // }).catch((ex) => {
    //   console.error('Error fetching users', ex);
    // });

    //
  }

  onEditTherapy(therapy: Therapy ){
    this.store.select('therapies')
      .take(1)
      .map(state => {
        return state.therapies.findIndex(item => item._id == therapy._id)
      }).subscribe(index => {
        this.router.navigate(['/therapies/' + index]);
      });
  }  

}
