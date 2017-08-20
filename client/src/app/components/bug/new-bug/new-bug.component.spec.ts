import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBugComponent } from './new-bug.component';

describe('NewBugComponent', () => {
  let component: NewBugComponent;
  let fixture: ComponentFixture<NewBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
