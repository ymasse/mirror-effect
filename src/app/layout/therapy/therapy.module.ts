import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  

// Translation imports
import { TranslateModule } from '@ngx-translate/core';

// Ngrx Imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Bootstrap Import
import { NgbCarouselModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Project Shared Imports
import { PageHeaderModule } from '../../shared';
import { SharedModule } from '../../shared/shared.module'

import { TherapyRoutingModule } from './therapy-routing.module';
import { TherapyComponent } from './therapy/therapy.component';

import { StatModule } from '../../shared';

// Exercise state import
import { therapyReducer } from './store/therapy.reducers';
import { TherapyEffects } from './store/therapy.effects';
import { TherapyViewerComponent } from './therapy-viewer/therapy-viewer.component';
import { TherapyListComponent } from './therapy-list/therapy-list.component';
import { TherapyListItemComponent } from './therapy-list-item/therapy-list-item.component';
import { TherapyEditComponent } from './therapy-edit/therapy-edit.component';
import { TherapyExerciseListComponent } from './therapy-exercise-list/therapy-exercise-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule.forRoot(),
    NgbAlertModule.forRoot(),
    NgbModule,
    NgbModalModule.forRoot(),
    NgbDropdownModule.forRoot(),
    TranslateModule,
    TherapyRoutingModule,
    StatModule,
    StoreModule.forFeature('therapies', therapyReducer),
    EffectsModule.forFeature([TherapyEffects]),
    SharedModule,
    PageHeaderModule,        
    ReactiveFormsModule,
    NgxDatatableModule        
  ],
  declarations: [
      TherapyComponent,
      TherapyViewerComponent,
      TherapyListComponent,
      TherapyListItemComponent,
      TherapyEditComponent,
      TherapyExerciseListComponent
  ]
})
export class TherapyModule { }
