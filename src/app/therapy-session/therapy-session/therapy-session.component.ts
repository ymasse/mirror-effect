
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Store } from '@ngrx/store';


import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';


@Component({
  selector: 'app-therapy-session',
  templateUrl: './therapy-session.component.html',
  styleUrls: ['./therapy-session.component.scss'],
  animations: [routerTransition()]
})
export class TherapySessionComponent implements OnInit {

    constructor( private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
      this.capture();
    }

    options = {
        audio: false,
        video: true,
        width: 1920,
        height: 1080
    };
    onSuccess = (stream: MediaStream) => {};
    onError = (err) => {};

    capture = () => {
        const video = <any>document.getElementsByTagName('video')[0];
        const canvas = <any>document.getElementsByTagName('canvas')[0];
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight, 0, 0, video.videoWidth/2, video.videoHeight );
            let ctx = canvas.getContext('2d');

            ctx.setTransform(
                -1, -1, 0, 1, 0, 0);
        

            ctx.drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight, (video.videoWidth/2)-1, 0, video.videoWidth/2, video.videoHeight );
        }
    }

    onQuit() {
      this.store.dispatch(new AuthActions.Logout(null));

    }

}




