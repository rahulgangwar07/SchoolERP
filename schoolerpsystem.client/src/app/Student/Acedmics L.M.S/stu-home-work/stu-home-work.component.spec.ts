import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuHomeWorkComponent } from './stu-home-work.component';

describe('StuHomeWorkComponent', () => {
  let component: StuHomeWorkComponent;
  let fixture: ComponentFixture<StuHomeWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuHomeWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuHomeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
