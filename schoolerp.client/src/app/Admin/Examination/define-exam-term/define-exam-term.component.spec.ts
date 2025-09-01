import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineExamTermComponent } from './define-exam-term.component';

describe('DefineExamTermComponent', () => {
  let component: DefineExamTermComponent;
  let fixture: ComponentFixture<DefineExamTermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineExamTermComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineExamTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
