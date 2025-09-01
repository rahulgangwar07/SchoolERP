import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuViewMarksheetComponent } from './stu-view-marksheet.component';

describe('StuViewMarksheetComponent', () => {
  let component: StuViewMarksheetComponent;
  let fixture: ComponentFixture<StuViewMarksheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuViewMarksheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuViewMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
