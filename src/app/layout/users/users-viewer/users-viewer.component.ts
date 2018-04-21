import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/findIndex';
import {User} from '../user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserDeletePopupComponent } from '../user-delete-popup/user-delete-popup.component';

import * as fromApp from '../../../store/app.reducers';
import * as fromUsers from '../store/user.reducers';
import * as UserActions from '../store/user.actions';


// FROM : Erase if not required.
// https://github.com/DanWahlin/Angular-JumpStart/blob/master/src/app/customers/customers-routing.module.ts
//https://blog.codewithdan.com/2017/02/08/10-angular-and-typescript-projects-to-take-you-from-zero-to-hero/

@Component({
    selector: 'app-users-viewer',
    templateUrl: './users-viewer.component.html',
    styleUrls: ['./users-viewer.component.scss'],
    animations: [routerTransition()]
})
export class UsersViewerComponent implements OnInit {

  filterText: string = "";
  // customers: ICustomer[] = [];
  // filteredCustomers: ICustomer[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords: number = 0;
  pageSize: number = 10;

  userState: Observable<fromUsers.State>;
  constructor(private translate: TranslateService,
              private router: Router,
              private store: Store<fromUsers.FeatureState>,
              private modalService: NgbModal) {       
  }

  ngOnInit() {
    this.filterText = 'Filtre:';
    this.displayMode = DisplayModeEnum.Card;

    // Refresh the list of users from the server.
    // TODO: see if we can optimize this.  Probably irrelevant to fetch all the users especially if 
    // there are many.
    //this.store.dispatch(new UserActions.FetchUsers());
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }  

  onDeleteUser(user: User ){
    const modalRef = this.modalService.open(UserDeletePopupComponent);
    modalRef.componentInstance.fullname.name = user.first_name + " " + user.last_name;
    modalRef.result.then((response) => {
      if (response === 'Yes') {
        this.store.dispatch(new UserActions.TryDeleteUser(user))
      }
    }).catch((ex) => {
      console.error('Error fetching users', ex);
    });

    //
  }

  onEditUser(user: User ){
    this.store.select('users')
      .take(1)
      .map(state => {
        return state.users.findIndex(item => item.username == user.username)
      }).subscribe(index => {
        this.router.navigate(['/users/' + index]);
      });
  }  
}

enum DisplayModeEnum {
  Card = 0,
  List = 1
}