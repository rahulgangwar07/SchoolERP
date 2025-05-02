import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuEContentComponent } from './stu-e-content.component';

describe('StuEContentComponent', () => {
  let component: StuEContentComponent;
  let fixture: ComponentFixture<StuEContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuEContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuEContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
