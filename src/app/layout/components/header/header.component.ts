import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
//import { AuthService } from "../../../auth/auth.service";
import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../../auth/store/auth.reducers';
import * as AuthActions from '../../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;
    pushRightClass: string = 'push-right';
    

    constructor(private translate: TranslateService, public router: Router, private store: Store<fromApp.AppState>) {
        //auth.handleAuthentication();
        
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {        
        this.store.dispatch(new AuthActions.Logout(null));
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedin() {
        this.store.dispatch(new AuthActions.Signin(null));
    }
}
