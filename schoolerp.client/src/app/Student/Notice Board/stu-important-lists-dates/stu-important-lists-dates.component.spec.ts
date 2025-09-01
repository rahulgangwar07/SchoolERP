import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuImportantListsDatesComponent } from './stu-important-lists-dates.component';

describe('StuImportantListsDatesComponent', () => {
  let component: StuImportantListsDatesComponent;
  let fixture: ComponentFixture<StuImportantListsDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuImportantListsDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuImportantListsDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
