import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCardComponent } from './blog-card/blog-card.component';
import { FancyLinkComponent } from './fancy-link/fancy-link.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [BlogCardComponent, FancyLinkComponent],
  exports: [BlogCardComponent, FancyLinkComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
