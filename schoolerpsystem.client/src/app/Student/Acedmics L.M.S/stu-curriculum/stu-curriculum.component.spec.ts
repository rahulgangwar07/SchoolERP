import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuCurriculumComponent } from './stu-curriculum.component';

describe('StuCurriculumComponent', () => {
  let component: StuCurriculumComponent;
  let fixture: ComponentFixture<StuCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuCurriculumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
