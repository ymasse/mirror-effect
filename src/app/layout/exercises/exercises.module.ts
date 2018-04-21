// Angular Core Imports
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

// Project Shared Imports
import { PageHeaderModule } from '../../shared';
import { SharedModule } from '../../shared/shared.module'

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// Exercise imports
import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesComponent } from './exercises.component';
import { ExerciseListComponent} from './exercise-list/exercise-list.component';
import { ExerciseEditPopupComponent } from './exercise-edit-popup/exercise-edit-popup.component';
import { ExerciseConfirmPopupComponent } from './exercise-confirm-popup/exercise-confirm-popup.component';


import { StatModule } from '../../shared';

// Exercise state import
import { exerciseReducer } from './store/exercise.reducers';
import { ExerciseEffects } from './store/exercise.effects';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule.forRoot(),
        NgbModalModule.forRoot(),
        TranslateModule,
        ExercisesRoutingModule,
        StatModule,
        StoreModule.forFeature('exercises', exerciseReducer),
        EffectsModule.forFeature([ExerciseEffects]),
        SharedModule,
        PageHeaderModule,        
        ReactiveFormsModule,
        NgxDatatableModule
    ],
    declarations: [
        ExercisesComponent,
        ExerciseListComponent,
        ExerciseEditPopupComponent,
        ExerciseConfirmPopupComponent
    ],
    entryComponents: [
        ExerciseEditPopupComponent,
        ExerciseConfirmPopupComponent
    ]
})
export class ExercisesModule {}
