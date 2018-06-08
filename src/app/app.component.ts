import {Component} from '@angular/core';
import {DeepWorldElement} from './deep-world/deep-world-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  deepWorldElements = [
    {'imagePath': 'assets/apartment-architecture-carpet-584399.jpg'},
    {'imagePath': 'assets/apartment-bed-bedroom-439227.jpg'},
    {'imagePath': 'assets/beach-casual-fashion-634808.jpg'},
    {'imagePath': 'assets/attractive-beautiful-beauty-1071049.jpg'}
  ];
}
