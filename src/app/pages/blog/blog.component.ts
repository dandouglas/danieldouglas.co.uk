import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

declare var ng: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent {

  currentRoute$: Observable<ScullyRoute> = this.scully.getCurrent();

  constructor(private scully: ScullyRoutesService) {
  }

}
