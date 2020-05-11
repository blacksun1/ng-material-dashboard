import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPatternImgComponent } from './geo-pattern-img.component';

describe('GeoPatternImgComponent', () => {
  let component: GeoPatternImgComponent;
  let fixture: ComponentFixture<GeoPatternImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoPatternImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoPatternImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
