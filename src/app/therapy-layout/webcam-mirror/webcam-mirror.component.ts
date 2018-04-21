import { ViewChild, ViewChildren, Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-webcam-mirror',
  templateUrl: 'webcam-mirror.component.html',
  styles: []
})
export class WebcamMirrorComponent implements OnInit, OnDestroy {

  @ViewChild('hardwareVideo') hardwareVideo: any;
  @ViewChild('feed') feed: any;
  @ViewChild('display') display: any;
  useRightSide: boolean=true;
  message: string ="";
  

  constructor() { }

  ngOnInit() {
    this.videoStart();
  }

  ngOnDestroy() {

  }
  
  videoStart(){
    let video = this.hardwareVideo.nativeElement;
    let feed = this.feed.nativeElement;
    let display = this.display.nativeElement;
    var n = <any>navigator;
    feed.style.display = 'none';
    video.style.display = 'none';

    feed.width = 640;
    feed.height = 480;

    display.width = 640;
    display.height = 480;

    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

    let onSuccessFct = this.onSuccess;
    let windowObj = window;
    let streamFeedFct = this.streamFeed;
    let displayFct = this.useRightSide? this.mirrorRightSideFeed : this.mirrorLeftSideFeed;
    this.message = this.useRightSide ? "Right side duplicated" : "Left side duplicated"

    n.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        onSuccessFct(stream, video, feed, display, windowObj, streamFeedFct, displayFct)
    });

  }

  onSuccess(stream, video, feed, display,  windowObj, streamFeedFct, displayFct) {

        var source;
        source = windowObj.URL.createObjectURL(stream);

        //video.autoplay = true;

        video.src = source;

        streamFeedFct(video, feed, display, streamFeedFct, displayFct);
  }

  streamFeed(video, feed, display, streamFeedFct, displayFct) {

    let myStreamFeed = streamFeedFct;
    requestAnimationFrame(() => {
        myStreamFeed(video, feed, display, myStreamFeed, displayFct);
    });


    let feedContext = feed.getContext('2d');
    let displayContext = display.getContext('2d');
    let imageData;
    displayFct(feedContext, video, display, displayContext);
    }

    /**
     * @function mirrorRightSideFeed
     * @description Copy the right side of the image contained in the feedContext on both side and reverse it vertically.
     */
    // This copy the right side of the image on both side.
    //Feed(feedContext, video, display, displayContext) {
    private mirrorRightSideFeed(feedContext, video, display, displayContext)  {

      let imageData;
      // This copy the right side of the image on both side.
      feedContext.save();
      // Multiply the y value by -1 to flip vertically
      feedContext.scale(-1, 1);
      // // Start at (0, -height), which is now the bottom-left corner


      feedContext.drawImage(video, -display.width, 0);
      feedContext.restore();
      //feedContext.drawImage(video, 0, 0, display.width/2, display.height, display.width/2, 0, display.width/2, display.height);
      feedContext.drawImage(video, 0, 0, display.width/2, display.height, 0, 0, display.width/2, display.height);

      feedContext.stroke();
      feedContext.arc(display.width/2,display.height/2,(display.height/2)-20,0,2*Math.PI, false);
      feedContext.clip();

      feedContext.beginPath();
      feedContext.lineWidth=3;
      feedContext.strokeStyle="#FFFFFF";
      feedContext.moveTo(display.width/2,20);
      feedContext.lineTo(display.width/2,display.height-20);
      feedContext.stroke();
      feedContext.beginPath();
      feedContext.arc(display.width/2,display.height/2,(display.height/2)-20,0,2*Math.PI);

      imageData = feedContext.getImageData(0, 0, display.width, display.height);

      //addEffects
      //imageData = addEffects(imageData);


      displayContext.putImageData(imageData, 0, 0);
    }

    /**
     * @function mirrorRightSideFeed
     * @description Copy the left side of the image contained in the feedContext on both side and reverse it vertically.
     */
    private mirrorLeftSideFeed(feedContext, video, display, displayContext) {
        let imageData;
        // This copy the left side of the image on both side.
        feedContext.save();
        // Multiply the y value by -1 to flip vertically
        feedContext.scale(-1, 1);

        // Start at (0, -height), which is now the bottom-left corner
        feedContext.drawImage(video, -display.width, 0, display.width, display.height);
        feedContext.restore();
        feedContext.drawImage(video, display.width/2, 0, display.width/2, display.height, display.width/2, 0, display.width/2, display.height);




        //feedContext.globalAlpha = 0.2;
        feedContext.beginPath();
        feedContext.lineWidth=3;
        feedContext.strokeStyle="#FFFFFF";
        feedContext.moveTo(display.width/2,20);
        feedContext.lineTo(display.width/2,display.height-20);
        feedContext.stroke();
        feedContext.beginPath();
        feedContext.arc(display.width/2,display.height/2,(display.height/2)-20,0,2*Math.PI);
        feedContext.stroke();
        


        imageData = feedContext.getImageData(0, 0, display.width, display.height);


        //addEffects
        //imageData = addEffects(imageData);
        displayContext.putImageData(imageData, 0, 0);
    }

}