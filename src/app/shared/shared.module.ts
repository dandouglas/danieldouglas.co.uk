import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCardComponent } from './blog-card/blog-card.component';
import { FancyLinkComponent } from './fancy-link/fancy-link.component';
import { RouterModule } from '@angular/router';
import { PolaroidComponent } from './polaroid/polaroid.component';
import { DisqusComponent } from './disqus/disqus.component';
import { DisqusModule } from 'ngx-disqus';


@NgModule({
  declarations: [
    BlogCardComponent,
    FancyLinkComponent,
    PolaroidComponent,
    DisqusComponent,
  ],
  exports: [
    BlogCardComponent,
    FancyLinkComponent,
    PolaroidComponent,
    DisqusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DisqusModule,
  ]
})
export class SharedModule { }
