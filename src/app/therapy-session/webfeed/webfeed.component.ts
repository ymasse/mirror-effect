import { ViewChild, ViewChildren, Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-webfeed',
  templateUrl: 'webfeed.component.html',
  styles: ['weebfeed.component.scss']
})
export class WebfeedComponent implements OnInit, OnDestroy {

  @ViewChild('hardwareVideo') hardwareVideo: any;
  @ViewChild('feed') feed: any;
  @ViewChild('display') display: any;
  @ViewChild('backgroundlayer') backgroundLayer: any;
  @ViewChild('backbuffer') backbuffer: any;

  readonly ELLIPSE_BORDER_COLOR: string = "#8c8c8c";
  readonly FACE_SEPARATOR_COLOR: string = "#595959";
  ELLIPSE_XRADIUS = 320;
  ELLIPSE_YRADIUS = 400;
  ELLIPSE_YOFFSET = 0;
  videoStream: any= null;
  isFirefox: boolean=false;

  constructor() { }

  ngOnInit() {
    this.videoStart();

    this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  ngOnDestroy() {
    if (this.videoStream != null) {
      // Stop the web cam.
      this.videoStream.getVideoTracks()[0].stop();
    }
  }
  
  videoStart(){
    let video = this.hardwareVideo.nativeElement;
    let feed = this.feed.nativeElement;
    let backbuffer = this.backbuffer.nativeElement;
    let display = this.display.nativeElement;
    let backgroundLayer = this.backgroundLayer.nativeElement;
    
    var n = <any>navigator;
    video.style.display = 'none';
    feed.style.display = 'none';
    backbuffer.style.display = 'none';
    //display.style.display = 'none';

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    //let canvasWidth = 640;
    //let canvasHeight = 480;
    feed.width = canvasWidth;
    feed.height = canvasHeight;

    backbuffer.width = canvasWidth;
    backbuffer.height = canvasHeight;

    display.width = canvasWidth;
    display.height = canvasHeight;

    this.ELLIPSE_YOFFSET = 0;
    this.ELLIPSE_XRADIUS = canvasWidth * 0.19;
    this.ELLIPSE_YRADIUS = canvasHeight * 0.42;

    backgroundLayer.width = canvasWidth;
    backgroundLayer.height = canvasHeight;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.mediaDevices.getUserMedia({ video: true }).then(this.onSuccess.bind(this));    
  }

  onSuccess(stream) {
    this.videoStream = stream;
    var source = window.URL.createObjectURL(stream);
    let video = this.hardwareVideo.nativeElement;
    video.autoplay = true;
    video.src = source;
    this.render();
  }



  render() {
    let video = this.hardwareVideo.nativeElement;
    let feed = this.feed.nativeElement;
    let backbuffer = this.backbuffer.nativeElement;
    let display = this.display.nativeElement;
    let backgroundLayer = this.backgroundLayer.nativeElement;

    requestAnimationFrame(this.render.bind(this));


    let feedContext = feed.getContext('2d');
    let backBufferContext = backbuffer.getContext('2d');
    let displayContext = display.getContext('2d');
    let backgrounContext = backgroundLayer.getContext('2d');
    let imageData;

    this.renderBackgroundNoDuplicate(video, backBufferContext);
    imageData = backBufferContext.getImageData(0, 0, display.width, display.height);
    backgrounContext.putImageData(imageData, 0, 0);  

    this.renderForegroundWithRightDuplicate(video, feedContext);
    this.renderFaceEllipse(video, feedContext);

    // Copy back the image in the main display canvas.
    imageData = feedContext.getImageData(0, 0, display.width, display.height);
    displayContext.putImageData(imageData, 0, 0);    
  }

  renderBackgroundNoDuplicate(video, ctx) {
  
    ctx.save();
    ctx.scale(-1, 1);

    ctx.translate(-ctx.canvas.width, 0);
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
    
    ctx.filter = 'brightness(12%)';
  }

  /**
   * Render the half duplicate face in the middle of the screen.  The right side of the face is duplicate.
   */
  renderForegroundWithRightDuplicate(video, ctx){
    
    // Draw Foreground

    // This copy the left side of the image on both side.
    //feedContext.globalAlpha = 0.2;
    ctx.save();
    // Multiply the y value by -1 to flip vertically
    ctx.scale(-1, 1);

  // Start at (0, -height), which is now the bottom-left corner
    ctx.translate(-ctx.canvas.width, 0);
    // This print the left side of image inverted on the right side.
    ctx.drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight, 0, 0, ctx.canvas.width/2, ctx.canvas.height);
    ctx.restore();

    // This print the left side of the image, on the left side like in the original image.
    ctx.drawImage(video, 0, 0, video.videoWidth/2, video.videoHeight, 0, 0, ctx.canvas.width/2, ctx.canvas.height);
  }

    /**
   * Render  the half duplicate face in the middle of the screen.  The left side of the face is duplicate.
   */
  renderForegroundWithLeftDuplicate(video, ctx){
    
    // Draw Foreground

    // This copy the left side of the image on both side.
    //feedContext.globalAlpha = 0.2;
    ctx.save();
    // Multiply the y value by -1 to flip vertically
    ctx.scale(-1, 1);

  // Start at (0, -height), which is now the bottom-left corner
    ctx.translate(-ctx.canvas.width, 0);
    
    // This print the left side of image inverted on the right side.
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();

    // This print the left side of the image, on the left side like in the original image.
    ctx.drawImage(video,  video.videoWidth/2, 0, video.videoWidth/2, video.videoHeight, ctx.canvas.width/2, 0, ctx.canvas.width/2, ctx.canvas.height);
  }


  /**
   * Draw a ellipse in the center of the screen which should contain the face of thepatient.  The image is also in a way
   * that only the pixels inside the ellipse will be copied. 
   */
  renderFaceEllipse(video, ctx) {

    // Extremely poor performance are observed in Firefox when using clip().  The lag is constantly increasing which is not acceptable
    // for this application.  Hence, in firefox, we will just not fade the bakcground.
    if (!this.isFirefox) {
      ctx.ellipse(ctx.canvas.width/2,(ctx.canvas.height/2)-this.ELLIPSE_YOFFSET, this.ELLIPSE_XRADIUS, this.ELLIPSE_YRADIUS, 0, 0, 2*Math.PI);    
      ctx.clip();
    }

    //feedContext.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.strokeStyle="ELLIPSE_BORDER_COLOR";
    ctx.moveTo(ctx.canvas.width/2,(ctx.canvas.height/2)-this.ELLIPSE_YRADIUS);
    ctx.lineTo(ctx.canvas.width/2,(ctx.canvas.height/2) + this.ELLIPSE_YRADIUS);
    ctx.setLineDash([5, 10]);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth=10;
    ctx.strokeStyle=this.FACE_SEPARATOR_COLOR;
    ctx.ellipse(ctx.canvas.width/2,(ctx.canvas.height/2)-this.ELLIPSE_YOFFSET, this.ELLIPSE_XRADIUS, this.ELLIPSE_YRADIUS, 0, 0, 2*Math.PI);
    ctx.setLineDash([]);
    ctx.stroke();
  }
}