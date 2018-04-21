import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module'

import { TherapySessionRoutingModule } from './therapy-session-routing.module';
import { TherapySessionComponent } from './therapy-session/therapy-session.component';
import { WebCamComponent } from './webcam/webcam.component';
import { WebfeedComponent} from './webfeed/webfeed.component';
import { PageHeaderModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    TherapySessionRoutingModule,
    TranslateModule,
    //StoreModule.forFeature('users', userReducer),
    //EffectsModule.forFeature([UserEffects]),
    SharedModule,
PageHeaderModule
  ],
  declarations: [
    TherapySessionComponent,
    WebCamComponent,
    WebfeedComponent
]
})
export class TherapySessionModule { }
