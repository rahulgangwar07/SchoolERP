import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWorkComponent } from './class-work.component';

describe('ClassWorkComponent', () => {
  let component: ClassWorkComponent;
  let fixture: ComponentFixture<ClassWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
