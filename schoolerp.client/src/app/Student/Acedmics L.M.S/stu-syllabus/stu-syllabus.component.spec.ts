import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuSyllabusComponent } from './stu-syllabus.component';

describe('StuSyllabusComponent', () => {
  let component: StuSyllabusComponent;
  let fixture: ComponentFixture<StuSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuSyllabusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
