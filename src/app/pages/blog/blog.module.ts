import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import { SharedModule } from 'src/app/shared/shared.module';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ScullyLibModule,
    SharedModule,
  ],
})
export class BlogModule {}
