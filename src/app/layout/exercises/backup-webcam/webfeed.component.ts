// import { ViewChild, ViewChildren, Component} from '@angular/core';

// @Component({
//   selector: 'app-webfeed',
//   templateUrl: 'webfeed.component.html',
//   styles: []
// })
// export class WebfeedComponent {

//   @ViewChild('hardwareVideo') hardwareVideo: any;
//   @ViewChild('feed') feed: any;
//   @ViewChild('display') display: any;
//   @ViewChild('display2') display2: any;
  
//   constructor() { }
  
//   videoStart(){
//     let video = this.hardwareVideo.nativeElement;
//     let feed = this.feed.nativeElement;
//     let display = this.display.nativeElement;
//     let display2 = this.display2.nativeElement;
//     var n = <any>navigator;
//     //video.style.display = 'none';
//     feed.style.display = 'none';

//      feed.width = 640;
//      feed.height = 480;

//     display.width = 640;
//     display.height = 480;

//     display2.width = 640;
//     display2.height = 480;

//     n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

//     //n.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//     //    video.src = window.URL.createObjectURL(stream);
//     //    video.play();
//     //});

//     let onSuccessFct = this.onSuccess;
//     let windowObj = window;
//     let streamFeedFct = this.streamFeed;
//     n.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
//         onSuccessFct(stream, video, feed, display, display2, windowObj, streamFeedFct)
//     });
//     //n.mediaDevices.getUserMedia({ video: true }).then(this.onSuccess);
    
//     // NOTE: For Video + Audio
//     // n.mediaDevices.getUserMedia({video: true, audio: true}).then(function(stream) {
//     //     video.src = window.URL.createObjectURL(stream);
//     //     video.play();
//     // });
//   }

//   onSuccess(stream, video, feed, display, display2, windowObj, streamFeedFct) {

//         var source;

//         // if (window.URL) {

//         //     source = window.URL.createObjectURL(stream);

//         // } else {

//         //     source = stream; // Opera and Firefox
//         // }
//         source = windowObj.URL.createObjectURL(stream);

//         video.autoplay = true;

//         video.src = source;
//         //video.play();

//         streamFeedFct(video, feed, display, display2, streamFeedFct);

//         //changeStatus('Connected.', false);

//     }

//     streamFeed(video, feed, display, display2, streamFeedFct) {

//         let myStreamFeed = streamFeedFct;
//         requestAnimationFrame(() => {
//             myStreamFeed(video, feed, display,display2,  myStreamFeed);
//         });


//         let feedContext = feed.getContext('2d');
//         let displayContext = display.getContext('2d');
//         let displayContext2 = display2.getContext('2d');
//         let imageData;

//         //feedContext.drawImage(video, 0, 0, display.width/2, display.height, 0, 0, display.width/2, display.height);


//         // This copy the right side of the image on both side.
//          feedContext.save();
//         // Multiply the y value by -1 to flip vertically
//         feedContext.scale(-1, 1);
//         // // Start at (0, -height), which is now the bottom-left corner
//         feedContext.drawImage(video, -display2.width, 0);
//         feedContext.restore();
//         //feedContext.drawImage(video, 0, 0, display.width/2, display.height, display.width/2, 0, display.width/2, display.height);
//         feedContext.drawImage(video, 0, 0, display2.width/2, display2.height, 0, 0, display2.width/2, display2.height);

//         imageData = feedContext.getImageData(0, 0, display2.width, display2.height);

//         //addEffects
//         //imageData = addEffects(imageData);
//         displayContext2.putImageData(imageData, 0, 0);




//         // This copy the left side of the image on both side.
//         feedContext.save();
//         // Multiply the y value by -1 to flip vertically
//         feedContext.scale(-1, 1);

//         // Start at (0, -height), which is now the bottom-left corner
//         feedContext.drawImage(video, -display.width, 0, display.width, display.height);
//         feedContext.restore();
//         feedContext.drawImage(video, display.width/2, 0, display.width/2, display.height, display.width/2, 0, display.width/2, display.height);

//         //feedContext.globalAlpha = 0.2;
//         feedContext.beginPath();
//         feedContext.lineWidth=5;
//         feedContext.strokeStyle="#FFFFFF";
//         feedContext.moveTo(display.width/2,20);
//         feedContext.lineTo(display.width/2,display.height-20);
//         feedContext.stroke();
//         feedContext.beginPath();
//         feedContext.arc(display.width/2,display.height/2,(display.height/2)-20,0,2*Math.PI);
//         feedContext.stroke();
        


//         imageData = feedContext.getImageData(0, 0, display.width, display.height);

//         //addEffects
//         //imageData = addEffects(imageData);
//         displayContext.putImageData(imageData, 0, 0);
        
//     }

// }