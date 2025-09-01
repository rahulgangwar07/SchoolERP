import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineExamSetComponent } from './define-exam-set.component';

describe('DefineExamSetComponent', () => {
  let component: DefineExamSetComponent;
  let fixture: ComponentFixture<DefineExamSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineExamSetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineExamSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
