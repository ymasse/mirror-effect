import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TherapySessionComponent } from './therapy-session/therapy-session.component';



const routes: Routes = [
  { path: '', component: TherapySessionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapySessionRoutingModule { }
