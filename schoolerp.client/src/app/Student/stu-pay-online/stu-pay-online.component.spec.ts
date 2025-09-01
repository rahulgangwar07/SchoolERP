import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuPayOnlineComponent } from './stu-pay-online.component';

describe('StuPayOnlineComponent', () => {
  let component: StuPayOnlineComponent;
  let fixture: ComponentFixture<StuPayOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuPayOnlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuPayOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
