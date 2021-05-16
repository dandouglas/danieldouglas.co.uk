import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  readonly faBars = faBars;
  nav: any;
  burger: any;

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
}

}
