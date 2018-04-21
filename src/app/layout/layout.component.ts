import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from './users/store/user.actions';
import * as fromUsers from './users/store/user.reducers';
import * as fromApp from '../store/app.reducers';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.store.select('users').dispatch(new UserActions.FetchUsers());
        
    }
}
