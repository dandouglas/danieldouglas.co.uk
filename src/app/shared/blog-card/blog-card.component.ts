import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent implements OnInit {

  constructor() { }

  @Input() posts: any; // TODO: Interface

  ngOnInit(): void {
  }

}