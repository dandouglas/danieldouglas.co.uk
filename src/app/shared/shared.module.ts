import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCardComponent } from './blog-card/blog-card.component';


@NgModule({
  declarations: [BlogCardComponent],
  exports: [BlogCardComponent],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
