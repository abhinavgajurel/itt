import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugHomeComponent } from './bug-home.component';

describe('bugHomeComponent', () => {
  let component: BugHomeComponent;
  let fixture: ComponentFixture<BugHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
