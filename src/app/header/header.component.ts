import { AfterViewInit, Component } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  readonly faBars = faBars;
  readonly faTimes = faTimes;
  nav: any;
  burger: any;
  sideNavIsVisible = false;


  constructor() { }

  ngAfterViewInit(): void {
  // Selection of HTML objects
  this.burger = document.querySelector('.burger');
  this.nav = document.querySelector('.nav');
  }



// Defining a function
toggleNav() {
    // this.burger.classList.toggle('fa-bars');
    // this.burger.classList.toggle('fa-times');
    this.nav.classList.toggle('nav-active');
    this.sideNavIsVisible = !this.sideNavIsVisible;
}

}
