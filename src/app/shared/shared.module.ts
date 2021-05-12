import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCardComponent } from './blog-card/blog-card.component';
import { FancyLinkComponent } from './fancy-link/fancy-link.component';


@NgModule({
  declarations: [BlogCardComponent, FancyLinkComponent],
  exports: [BlogCardComponent, FancyLinkComponent],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
