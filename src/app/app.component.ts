import { Component, OnInit, OnDestroy} from '@angular/core';
import * as fromAuth from './auth/store/auth.reducers';
import * as fromApp from './store/app.reducers';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private translate: TranslateService, private router: Router, private store: Store<fromApp.AppState>) { }
    ngOnInit() {
      this.translate.use('fr');

      let me = this;

      this.store.select('auth')
        .subscribe((authState: fromAuth.State) => {
          if (!authState.authenticated) {
            me.router.navigate(["/auth/signin"]);
          }
          
        }
      );

      // this.store.select('auth')
      // .take(1)
      // .subscribe((authState: fromAuth.State) => {
      //   if (!authState.authenticated) {
      //     this.router.navigate(["/auth/signin"]);
      //   }
       
      // });
    }

    ngOnDestroy() {

    } 
}
