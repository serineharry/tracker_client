import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardApplicationComponent } from './dashboard-application.component';

describe('DashboardApplicationComponent', () => {
  let component: DashboardApplicationComponent;
  let fixture: ComponentFixture<DashboardApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
