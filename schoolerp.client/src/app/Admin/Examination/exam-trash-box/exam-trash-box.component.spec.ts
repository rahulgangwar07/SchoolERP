import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTrashBoxComponent } from './exam-trash-box.component';

describe('ExamTrashBoxComponent', () => {
  let component: ExamTrashBoxComponent;
  let fixture: ComponentFixture<ExamTrashBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamTrashBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamTrashBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
