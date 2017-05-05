import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerAlertComponent } from './tracker-alert.component';

describe('TrackerAlertComponent', () => {
  let component: TrackerAlertComponent;
  let fixture: ComponentFixture<TrackerAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
