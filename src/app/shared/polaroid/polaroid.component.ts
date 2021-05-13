import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-polaroid',
  templateUrl: './polaroid.component.html',
  styleUrls: ['./polaroid.component.scss']
})
export class PolaroidComponent implements OnInit {

  @Input() image: string;
  @Input() caption: string;
  @Input() width: string;
  @Input() height: string;

  constructor() { }

  ngOnInit(): void {
  }

}
