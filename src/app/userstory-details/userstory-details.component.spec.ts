import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstoryDetailsComponent } from './userstory-details.component';

describe('UserstoryDetailsComponent', () => {
  let component: UserstoryDetailsComponent;
  let fixture: ComponentFixture<UserstoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserstoryDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
