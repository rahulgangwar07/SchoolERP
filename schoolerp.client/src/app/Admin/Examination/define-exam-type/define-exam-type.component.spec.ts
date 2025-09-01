import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineExamTypeComponent } from './define-exam-type.component';

describe('DefineExamTypeComponent', () => {
  let component: DefineExamTypeComponent;
  let fixture: ComponentFixture<DefineExamTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineExamTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineExamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
