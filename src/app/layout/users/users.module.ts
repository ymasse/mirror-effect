import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms';  
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StatModule } from '../../shared';
import { userReducer } from './store/user.reducers';
import { UserEffects } from './store/user.effects';
import { UsersCardComponent } from './users-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersViewerComponent } from './users-viewer/users-viewer.component';
import { UserDeletePopupComponent } from './user-delete-popup/user-delete-popup.component';
import { UsersCardItemComponent } from './users-card-item/users-card-item.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PageHeaderModule } from './../../shared';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        NgbModalModule.forRoot(),
        TranslateModule,
        UsersRoutingModule,
        StatModule,
        StoreModule.forFeature('users', userReducer),
        EffectsModule.forFeature([UserEffects]),
        SharedModule,
        PageHeaderModule,        
        ReactiveFormsModule        
    ],
    declarations: [
        UsersComponent,
        UsersCardComponent,
        UsersCardItemComponent,
        UsersViewerComponent,
        UserDeletePopupComponent,
        UserEditComponent,
        UserListComponent
    ],
    entryComponents: [
        UserDeletePopupComponent
    ]
})
export class UsersModule {}