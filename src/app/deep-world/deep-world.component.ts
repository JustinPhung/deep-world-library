import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {DeepWorldElement, DisplayText} from './deep-world-element';

@Component({
  selector: 'deep-world',
  templateUrl: './deep-world.component.html',
  styleUrls: ['./deep-world.component.css'],
})
export class DeepWorldComponent {
  private zoomDelta = 10;
  @Input() imagePaths: DeepWorldElement[];

  @ViewChild('zoomImage') image: ElementRef;
  imageOnDisplay = 0;
  zoomPercentage = 100;
  left = 50;
  top = 50;

  displayTexts: DisplayText[] = [];

  constructor() {
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    if (event.deltaY < 0) {

      this.zoomPercentage += this.zoomDelta;
      this.top -= this.calculateChange(event.clientY, window.screen.height);
      this.left -= this.calculateChange(event.clientX, window.screen.width);

      if ( this.imagePaths[this.imageOnDisplay].displayTexts !== undefined) {

        this.imagePaths[this.imageOnDisplay].displayTexts.forEach(_ => {
          _.locationY += (_.locationY / 100 - (event.clientY / window.screen.height)) * Math.PI;
          _.locationX += (_.locationX / 100 - (event.clientX / window.screen.width)) * Math.PI;
        });
      }

      if (this.zoomPercentage > 300) {
        this.getNextImage();
      }
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
}
