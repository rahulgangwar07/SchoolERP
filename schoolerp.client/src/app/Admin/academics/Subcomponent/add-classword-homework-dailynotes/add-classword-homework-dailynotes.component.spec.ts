import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClasswordHomeworkDailynotesComponent } from './add-classword-homework-dailynotes.component';

describe('AddClasswordHomeworkDailynotesComponent', () => {
  let component: AddClasswordHomeworkDailynotesComponent;
  let fixture: ComponentFixture<AddClasswordHomeworkDailynotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddClasswordHomeworkDailynotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClasswordHomeworkDailynotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
