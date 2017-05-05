import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderSearchComponent } from './reminder-search.component';

describe('ReminderSearchComponent', () => {
  let component: ReminderSearchComponent;
  let fixture: ComponentFixture<ReminderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
