import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentSettingComponent } from './view-student-setting.component';

describe('ViewStudentSettingComponent', () => {
  let component: ViewStudentSettingComponent;
  let fixture: ComponentFixture<ViewStudentSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewStudentSettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
