import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {DeepWorldElement, DisplayText} from './deep-world-element';

@Component({
  selector: 'deep-world',
  templateUrl: './deep-world.component.html',
  styleUrls: ['./deep-world.component.css'],
})
export class DeepWorldComponent implements OnInit{
  private zoomDelta = 0.3;
  @Input() imagePaths: DeepWorldElement[];
  @Input() autoZoom = false;
  @ViewChild('zoomImage') image: ElementRef;

  imageOnDisplay = 0;
  zoomPercentage = 100;
  left = 50;
  top = 50;
  x = window.pageXOffset + window.innerWidth / 2;
  y = window.pageYOffset + window.innerHeight / 2;

  displayTexts: DisplayText[] = [];

  constructor() {
  }


   @HostListener('mousemove', ['$event']) onMouseUpdate(e) {
     this.x = e.pageX;
     this.y = e.pageY;
   }

   @HostListener('mouseenter', ['$event']) onMouseEnter(e) {
    this.x = e.pageX;
    this.y = e.pageY;
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    if (event.deltaY < 0) {
      this.zoom(event.clientX, event.clientY);
    } else {
      this.resetParameter();
      /*
      if (this.zoomPercentage > 100) {
        this.zoomPercentage -= this.zoomDelta;
      } else {
        this.resetParameter();
      }
      this.top += (50 - this.top) / ( this.zoomPercentage / ((this.zoomPercentage - this.zoomDelta) ) * (this.zoomDelta /  2));
      this.left += (50 - this.left) / ( this.zoomPercentage / ((this.zoomPercentage - this.zoomDelta) ) * (this.zoomDelta / 2));
      */
    }
    event.preventDefault();
  }

  private zoom( x: number, y: number) {

      this.zoomPercentage += this.zoomDelta;
      this.top -= this.calculateChange(y, window.screen.height);
      this.left -= this.calculateChange(x, window.screen.width);

      if (this.imagePaths[this.imageOnDisplay].displayTexts !== undefined) {

        this.imagePaths[this.imageOnDisplay].displayTexts.forEach(_ => {
          _.locationY += (_.locationY / 100 - (y / window.screen.height)) * Math.PI;
          _.locationX += (_.locationX / 100 - (x / window.screen.width)) * Math.PI;
        });
      }

      if (this.zoomPercentage > 300) {
        this.getNextImage();
      }

  }

  getImgStyle(): any {
    return {
      'height': this.zoomPercentage + '%',
      'left': this.left + '%',
      'top': this.top + '%',
      '-webkit-transition': 'transform 1s ease-in-out',
      'transition-delay': '1s'

  };
  }

  getTextStyle(displayText: DisplayText): any {
    return {
      'left': displayText.locationX + '%',
      'top': displayText.locationY + '%',
      'position': 'absolute'
  };
  }

  getNextImage(): void {
    if (this.imageOnDisplay === this.imagePaths.length - 1) {
      this.imageOnDisplay = 0;
    } else {
      this.imageOnDisplay += 1;
    }
     this.resetParameter();
  }

  resetParameter(): void {
    this.displayTexts = [];
    this.zoomPercentage = 100;
    this.left = 50;
    this.top = 50;
  }

  calculateChange(mousePosition, windowSize): number {
    return ((mousePosition - (windowSize / 2)) /
      (windowSize / 2)) * (this.zoomPercentage / (this.zoomPercentage - this.zoomDelta)) * this.zoomDelta / 2;
  }

  getImagePath(): String {
    return this.imagePaths[this.imageOnDisplay].imagePath;
  }

  private showTexts(displayTexts: DisplayText[]) {
    /*
    if (displayTexts !== undefined) {
      displayTexts.forEach(d => {
        if (!this.displayTexts.includes(d) && d.showAtZoomFactor <= this.zoomPercentage) {
          this.displayTexts.push(d);
        }
      });
    }
    */
  }

  ngOnInit(): void {
    if (this.autoZoom) {
      setInterval(() => this.zoom(this.x, this.y), 20);
    }
  }
}
