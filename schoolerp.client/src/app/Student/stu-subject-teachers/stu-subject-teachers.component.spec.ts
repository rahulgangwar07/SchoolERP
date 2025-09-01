import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuSubjectTeachersComponent } from './stu-subject-teachers.component';

describe('StuSubjectTeachersComponent', () => {
  let component: StuSubjectTeachersComponent;
  let fixture: ComponentFixture<StuSubjectTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuSubjectTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuSubjectTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
