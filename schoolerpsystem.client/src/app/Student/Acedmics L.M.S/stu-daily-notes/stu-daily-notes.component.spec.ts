import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuDailyNotesComponent } from './stu-daily-notes.component';

describe('StuDailyNotesComponent', () => {
  let component: StuDailyNotesComponent;
  let fixture: ComponentFixture<StuDailyNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuDailyNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuDailyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
