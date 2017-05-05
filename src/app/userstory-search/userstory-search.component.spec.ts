import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserstorySearchComponent } from './userstory-search.component';

describe('UserstorySearchComponent', () => {
  let component: UserstorySearchComponent;
  let fixture: ComponentFixture<UserstorySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserstorySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
