import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuReturnBookComponent } from './stu-return-book.component';

describe('StuReturnBookComponent', () => {
  let component: StuReturnBookComponent;
  let fixture: ComponentFixture<StuReturnBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuReturnBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuReturnBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
