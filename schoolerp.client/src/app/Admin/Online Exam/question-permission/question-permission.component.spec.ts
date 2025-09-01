import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPermissionComponent } from './question-permission.component';

describe('QuestionPermissionComponent', () => {
  let component: QuestionPermissionComponent;
  let fixture: ComponentFixture<QuestionPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
