// import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';

// /**
//  * Component options structure interface
//  */
// interface Options {
//   video: boolean | any;
//   cameraType: string;
//   audio: boolean;
//   width: number;
//   height: number;
// }

// /**
//  * https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
//  */
// interface MediaDevice {
//   deviceId: string;
//   kind: string;
//   label: string;
// }

// /**
//  * Render WebCam Component
//  */
// @Component({
//   selector: 'app-webcam',
//   templateUrl: 'webcam.component.html',
//   styleUrls: ['./webcam.component.scss']
// })
// export class WebCamComponent implements OnInit, AfterViewInit {
//   public videoSrc: any;
//   public isSupportWebRTC: boolean;
//   public browser: any;
//   @Input() options: Options;
//   @Input() onSuccess: Function;
//   @Input() onError: Function;

//   constructor(private sanitizer: DomSanitizer, private element: ElementRef) {
//     this.isSupportWebRTC = false;
//     this.browser = <any>navigator;
//   }

//   ngOnInit() {
//     // getUserMedia() feature detection for older browser
//     this.browser.getUserMedia_ = (this.browser.getUserMedia
//     || this.browser.webkitGetUserMedia
//     || this.browser.mozGetUserMedia
//     || this.browser.msGetUserMedia);

//     // Older browsers might not implement mediaDevices at all, so we set an empty object first
//     if ((this.browser.mediaDevices === undefined) && !!this.browser.getUserMedia_) {
//       this.browser.mediaDevices = {};
//     }

//     // Some browsers partially implement mediaDevices. We can't just assign an object
//     // with getUserMedia as it would overwrite existing properties.
//     // Here, we will just add the getUserMedia property if it's missing.
//     if ((this.browser.mediaDevices && this.browser.mediaDevices.getUserMedia === undefined) && !!this.browser.getUserMedia_) {
//       this.browser.mediaDevices.getUserMedia = (constraints) => {

//         return new Promise((resolve, reject) => {
//           this.browser.getUserMedia_.call(this.browser, constraints, resolve, reject);
//         });
//       }
//     }
    
//     this.isSupportWebRTC = !!(this.browser.mediaDevices && this.browser.mediaDevices.getUserMedia);
//     // default options
//     this.options.width = this.options.width || 320;
//     this.options.height = this.options.height || 240;
//     this.options.cameraType = this.options.cameraType  || 'front';
//   }

//   ngAfterViewInit() {
//     this.startCapturingVideo();
//   }

//   /**
//    * Switch to facing mode and setup web camera
//    * @returns {void}
//    */
//   onWebRTC(): any {
//     // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
//     if (this.browser.mediaDevices.enumerateDevices && this.options.video) {
//       const cameraType = this.options.cameraType;
//       this.browser.mediaDevices.enumerateDevices().then((devices) => {
//         devices.forEach((device: MediaDevice) => {
//           if (device && device.kind === 'videoinput') {
//             if (device.label.toLowerCase().search(cameraType) > -1) {
//               this.options.video = {deviceId: {exact: device.deviceId}, facingMode: 'environment'};
//             }
//           }
//         });
//         this.setWebcam();
//       });
//     }
//     else {
//       this.setWebcam();
//     }
//   }

//   /**
//    * Setup web camera using native browser API
//    * @returns {void}
//    */
//   setWebcam(): any {
//     // constructing a getUserMedia config-object and
//     // an string (we will try both)
//     let optionObject = { audio: false, video: false };
//     let optionString = '';
//     let container: any, video: any, ow: any, oh: any;

//     if (this.options.video) {
//       optionObject.video = this.options.video;
//       optionString = 'video';
//     }
//     if (this.options.audio === true) {
//       optionObject.audio = true;
//       if (optionString !== '') {
//         optionString = optionString + ', ';
//       }
//       optionString = optionString + 'audio';
//     }

//     container = this.element.nativeElement.querySelector('#ng2-webcam');
//     video = this.element.nativeElement.querySelector('video');
//     video.autoplay = true;
//     // Fix for ratio
//     ow = parseInt(container.offsetWidth, 10);
//     oh = parseInt(container.offsetHeight, 10);

//     if (this.options.width < ow && this.options.height < oh) {
//       this.options.width = ow;
//       this.options.height = oh;
//     }

//     // configure the interim video
//     video.width = this.options.width;
//     video.height = this.options.height;
//     video.autoplay = true;

//     // Promisify async callback's for angular2 change detection
//     const promisifyGetUserMedia = () => {
//       return new Promise<string>((resolve, reject) => {
//         // first we try if getUserMedia supports the config object
//         try {
//           // try object
//           this.browser.mediaDevices.getUserMedia(optionObject)
//             .then((stream: any) => resolve(stream))
//             .catch((objErr: any) => {
//               // option object fails
//               // try string syntax
//               // if the config object failes, we try a config string
//               this.browser.mediaDevices.getUserMedia(optionObject)
//                 .then((stream: any) => resolve(stream))
//                 .catch((strErr: any) => {

//                   console.error(objErr);
//                   console.error(strErr);

//                   reject(new Error('Both configs failed. Neither object nor string works'));
//               });
//           });
//         } catch (e) {
//           reject(e);
//         }
//       });
//     };

//     promisifyGetUserMedia().then((stream) => {
//       let webcamUrl = URL.createObjectURL(stream);
//       this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(webcamUrl);
//       this.onSuccess(stream); // TODO stream :MediaStream
//     }).catch((err) => {
//       this.onError(err);
//     });
//   }




//   /**
//    * Start capturing video stream
//    * @returns {void}
//    */
//   startCapturingVideo(): any {
//     if (this.isSupportWebRTC) {
//       return this.onWebRTC();
//     }

//     console.error('WebCam not supported');
//   }
// }

// export default WebCamComponent;
