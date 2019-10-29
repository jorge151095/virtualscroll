import { Component, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent {

  constructor() { }

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
}
