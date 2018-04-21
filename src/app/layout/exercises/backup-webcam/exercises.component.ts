// import { Component, OnInit } from '@angular/core';
// import { routerTransition } from '../../router.animations';

// @Component({
//     selector: 'app-exercises',
//     templateUrl: './exercises.component.html',
//     styleUrls: ['./exercises.component.scss'],
//     animations: [routerTransition()]
// })
// export class ExercisesComponent implements OnInit {

//     constructor() {}

//     ngOnInit() {}

//     options = {
//         audio: false,
//         video: true,
//         width: 1024,
//         height: 800
//     };
//     onSuccess = (stream: MediaStream) => {};
//     onError = (err) => {};

//     capture = () => {
//         const video = <any>document.getElementsByTagName('video')[0];
//         const canvas = <any>document.getElementsByTagName('canvas')[0];
//         if (video) {
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight, 0, 0, video.videoWidth/2, video.videoHeight );
//             let ctx = canvas.getContext('2d');

//             ctx.setTransform(
//                 -1, -1, 0, 1, 0, 0);
        

//             ctx.drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight, (video.videoWidth/2)-1, 0, video.videoWidth/2, video.videoHeight );
//         }
//     }
// }
