import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeepWorldComponent } from './deep-world.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DeepWorldComponent],
  exports: [DeepWorldComponent]
})
export class DeepWorldModule { }
