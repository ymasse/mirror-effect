import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from '../shared';
import { TherapyLayoutComponent } from './therapy-layout.component';
//import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
//import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
//import { RecipeStartComponent } from './recipe-start/recipe-start.component';
//import { RecipesComponent } from './recipes.component';

const therapyLayoutRoutes: Routes = [
  { path: '', component: TherapyLayoutComponent, children: [
  //  { path: '', component: RecipeStartComponent },
  //  { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
  //  { path: ':id', component: RecipeDetailComponent },
  //  { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(therapyLayoutRoutes)
  ],
  exports: [RouterModule],
  // providers: [
  //   AuthGuard
  // ]
})
export class TherapyLayoutRoutingModule {}
