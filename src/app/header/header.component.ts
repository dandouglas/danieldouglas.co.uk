import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  readonly faBars = faBars;
  readonly faTimes = faTimes;
  sideNavIsVisible = false;
  @ViewChild('nav') nav: ElementRef;
  destroy$ = new Subject<void>();


  constructor(
    private router: Router
  ) {
    this.router.events
    .pipe(takeUntil(this.destroy$))
    .subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.nav.nativeElement.classList.remove('nav-active');
        this.sideNavIsVisible = false;
      }
    });
  }

  toggleNav(): void {
    this.nav.nativeElement.classList.toggle('nav-active');
    this.sideNavIsVisible = !this.sideNavIsVisible;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
