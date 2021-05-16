import { Component, ElementRef, ViewChild } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  readonly faBars = faBars;
  readonly faTimes = faTimes;
  sideNavIsVisible = false;
  @ViewChild('nav') nav: ElementRef;


  constructor() { }

  toggleNav() {
    this.nav.nativeElement.classList.toggle('nav-active');
    this.sideNavIsVisible = !this.sideNavIsVisible;
  }

}
