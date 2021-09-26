import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogRootComponent } from './blog-root.component';

describe('BlogRootComponent', () => {
  let component: BlogRootComponent;
  let fixture: ComponentFixture<BlogRootComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
