import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DeepWorldModule} from './deep-world/deep-world.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DeepWorldModule
  ],
  exports: [DeepWorldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
