import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'therapy-session', loadChildren: './therapy-session/therapy-session.module#TherapySessionModule'},
    { path: '', loadChildren: './layout/layout.module#LayoutModule' , canActivate: [AuthGuard]},
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        AuthGuard
      ]
})
export class AppRoutingModule {}
