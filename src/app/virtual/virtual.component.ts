import { Component, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css'],
  animations: [
    trigger('bounceTop', [
      transition('start =>  finish', [
        animate('1s', keyframes([
          style({ transform: `translateY(0)` }),
          style({ transform: `translateY(10px)` }),
          style({ transform: `translateY(0)` })
        ]))
      ])
    ]),
    trigger('bounceBottom', [
      transition('start =>  finish', [
        animate('1s', keyframes([
          style({ transform: `translateY(0)` }),
          style({ transform: `translateY(-10px)` }),
          style({ transform: `translateY(0)` })
        ]))
      ])
    ]),
    trigger('bounceRight', [
      transition('start =>  finish', [
        animate('1s', keyframes([
          style({ transform: `translateX(0)` }),
          style({ transform: `translateX(-10px)` }),
          style({ transform: `translateX(0)` })
        ]))
      ])
    ]),
    trigger('bounceLeft', [
      transition('start =>  finish', [
        animate('1s', keyframes([
          style({ transform: `translateX(0)` }),
          style({ transform: `translateX(10px)` }),
          style({ transform: `translateX(0)` })
        ]))
      ])
    ])
  ]
})
export class VirtualComponent {

  constructor() { }

  bounceTop = false;
  bounceBottom = false;
  bounceRight = false;
  bounceLeft = false;
  objects = Array(20).fill(0);

  persons = Array(500).fill(0);
  @ViewChild(CdkVirtualScrollViewport, {static: true}) viewPort: CdkVirtualScrollViewport;

  goToEnd() {
    this.viewPort.scrollToIndex( this.persons.length);
  }

  goToStart() {
    this.viewPort.scrollToIndex(0);
  }

  goToMiddle() {
    this.viewPort.scrollToIndex( this.persons.length / 2);
  }

  scrollEvent(e, position?) {
    if (position === 'horizontal') {
      if (e.target.scrollLeft === 0) {
        this.bounceLeft = true;
      } else {
        this.bounceLeft = false;
      }
      if ( Math.round(e.target.scrollWidth - e.target.scrollLeft) === e.target.clientWidth) {
        this.bounceRight = true;
      } else {
        this.bounceRight = false;
      }
    } else {
      if (e.target.scrollTop === 0) {
        this.bounceTop = true;
      } else {
        this.bounceTop = false;
      }
      if (Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight) {
        this.bounceBottom = true;
      } else {
        this.bounceBottom = false;
      }
    }
  }
}
