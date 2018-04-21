import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TherapyLayoutComponent } from './therapy-layout.component';
import { TherapyLayoutRoutingModule } from './therapy-layout-routing.module';
import { WebcamMirrorComponent } from './webcam-mirror/webcam-mirror.component';
//import { SharedModule } from '../shared/shared.module';
//import { recipeReducer } from './store/recipe.reducers';
//import { RecipeEffects } from './store/recipe.effects';

@NgModule({
  declarations: [
    TherapyLayoutComponent,
    WebcamMirrorComponent
    //RecipeStartComponent,
    //RecipeListComponent,
    //RecipeEditComponent,
    //RecipeDetailComponent,
    //RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TherapyLayoutRoutingModule,    
    NgbModule.forRoot()
    //SharedModule,
    //StoreModule.forFeature('therapy-layout', recipeReducer),
    //EffectsModule.forFeature([RecipeEffects])
  ]
})
export class TherapyLayoutModule {}
