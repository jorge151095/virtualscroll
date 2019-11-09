import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrollingModule} from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppComponent } from './app.component';
import { VirtualComponent } from './virtual/virtual.component';
import { DragComponent } from './drag/drag.component';
import { CountriesComponent } from './countries/countries.component';
import { HttpClientModule} from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoundingScrollDirective } from './bounding-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    VirtualComponent,
    DragComponent,
    CountriesComponent,
    BoundingScrollDirective
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    DragDropModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
