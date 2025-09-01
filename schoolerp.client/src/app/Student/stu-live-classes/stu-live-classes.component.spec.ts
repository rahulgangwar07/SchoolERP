import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuLiveClassesComponent } from './stu-live-classes.component';

describe('StuLiveClassesComponent', () => {
  let component: StuLiveClassesComponent;
  let fixture: ComponentFixture<StuLiveClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StuLiveClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuLiveClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
