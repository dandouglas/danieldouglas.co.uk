import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCardComponent } from './blog-card/blog-card.component';
import { FancyLinkComponent } from './fancy-link/fancy-link.component';
import { RouterModule } from '@angular/router';
import { PolaroidComponent } from './polaroid/polaroid.component';


@NgModule({
  declarations: [BlogCardComponent, FancyLinkComponent, PolaroidComponent],
  exports: [BlogCardComponent, FancyLinkComponent, PolaroidComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
