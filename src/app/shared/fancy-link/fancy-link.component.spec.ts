import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyLinkComponent } from './fancy-link.component';

describe('FancyLinkComponent', () => {
  let component: FancyLinkComponent;
  let fixture: ComponentFixture<FancyLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
