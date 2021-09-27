import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';

@Component({
  selector: 'app-disqus',
  templateUrl: './disqus.component.html',
  styleUrls: ['./disqus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisqusComponent implements OnInit {

  @Input() route: ScullyRoute;
  url: string;

  constructor() { }

  ngOnInit(): void {
    this.url = `https://danieldouglas.co.uk${this.route.route}`;
  }

}
