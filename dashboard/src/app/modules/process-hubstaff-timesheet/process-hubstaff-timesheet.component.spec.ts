import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessHubstaffTimesheetComponent } from './process-hubstaff-timesheet.component';

describe('ProcessHubstaffTimesheetComponent', () => {
  let component: ProcessHubstaffTimesheetComponent;
  let fixture: ComponentFixture<ProcessHubstaffTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessHubstaffTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessHubstaffTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
