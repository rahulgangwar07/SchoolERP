import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineExamNameComponent } from './define-exam-name.component';

describe('DefineExamNameComponent', () => {
  let component: DefineExamNameComponent;
  let fixture: ComponentFixture<DefineExamNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineExamNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineExamNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
