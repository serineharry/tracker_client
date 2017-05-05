import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSearchComponent } from './schedule-search.component';

describe('ScheduleSearchComponent', () => {
  let component: ScheduleSearchComponent;
  let fixture: ComponentFixture<ScheduleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
