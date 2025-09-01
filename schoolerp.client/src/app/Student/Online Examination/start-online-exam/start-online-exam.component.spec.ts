import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOnlineExamComponent } from './start-online-exam.component';

describe('StartOnlineExamComponent', () => {
  let component: StartOnlineExamComponent;
  let fixture: ComponentFixture<StartOnlineExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartOnlineExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartOnlineExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
