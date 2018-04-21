import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { UsersModule} from './users/users.module';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        UsersModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    
    providers: [
      //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    ]
})
export class LayoutModule {}
