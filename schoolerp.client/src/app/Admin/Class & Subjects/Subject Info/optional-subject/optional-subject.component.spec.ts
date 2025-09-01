import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSubjectComponent } from './optional-subject.component';

describe('OptionalSubjectComponent', () => {
  let component: OptionalSubjectComponent;
  let fixture: ComponentFixture<OptionalSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionalSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionalSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
