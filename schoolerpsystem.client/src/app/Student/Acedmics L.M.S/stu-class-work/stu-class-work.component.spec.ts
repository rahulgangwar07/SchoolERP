import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuClassWorkComponent } from './stu-class-work.component';

describe('StuClassWorkComponent', () => {
  let component: StuClassWorkComponent;
  let fixture: ComponentFixture<StuClassWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuClassWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuClassWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
