import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingRouteComponent } from './missing-route.component';

describe('MissingRouteComponent', () => {
  let component: MissingRouteComponent;
  let fixture: ComponentFixture<MissingRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
