import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSettingComponent } from './evaluation-setting.component';

describe('EvaluationSettingComponent', () => {
  let component: EvaluationSettingComponent;
  let fixture: ComponentFixture<EvaluationSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
