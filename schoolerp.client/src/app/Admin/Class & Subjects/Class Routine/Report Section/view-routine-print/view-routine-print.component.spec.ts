import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoutinePrintComponent } from './view-routine-print.component';

describe('ViewRoutinePrintComponent', () => {
  let component: ViewRoutinePrintComponent;
  let fixture: ComponentFixture<ViewRoutinePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRoutinePrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoutinePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
