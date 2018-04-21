import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersCardComponent } from './users-card.component';
import { UsersViewerComponent }  from './users-viewer/users-viewer.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
    {
        path: '', component: UsersComponent, children: [
            { path: '', component: UsersViewerComponent },
            { path: 'new', component: UserEditComponent },
            { path: ':id', component: UserEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
