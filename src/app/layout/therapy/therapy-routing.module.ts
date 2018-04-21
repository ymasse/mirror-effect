import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TherapyComponent } from './therapy/therapy.component';
import { TherapyEditComponent } from './therapy-edit/therapy-edit.component';
import { TherapyViewerComponent } from './therapy-viewer/therapy-viewer.component';

const routes: Routes = [
  {
    path: '', component: TherapyComponent, children: [
      { path: '', component: TherapyViewerComponent },
      { path: 'new', component: TherapyEditComponent },
      { path: ':id', component: TherapyEditComponent },
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapyRoutingModule { }


