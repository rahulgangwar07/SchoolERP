import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNewQuestionComponent } from './ask-new-question.component';

describe('AskNewQuestionComponent', () => {
  let component: AskNewQuestionComponent;
  let fixture: ComponentFixture<AskNewQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AskNewQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskNewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
