import { Component, OnDestroy } from '@angular/core';
import { Router, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  isAboutPage: boolean;
  destroy$ = new Subject<void>();

  constructor(
    private router: Router
  ) {
    this.router.events
    .pipe(takeUntil(this.destroy$))
    .subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.isAboutPage = event.url === '/about'
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
