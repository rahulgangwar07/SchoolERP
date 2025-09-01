import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialCommandComponent } from './special-command.component';

describe('SpecialCommandComponent', () => {
  let component: SpecialCommandComponent;
  let fixture: ComponentFixture<SpecialCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialCommandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
