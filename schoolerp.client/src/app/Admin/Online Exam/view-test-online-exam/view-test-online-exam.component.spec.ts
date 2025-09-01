import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestOnlineExamComponent } from './view-test-online-exam.component';

describe('ViewTestOnlineExamComponent', () => {
  let component: ViewTestOnlineExamComponent;
  let fixture: ComponentFixture<ViewTestOnlineExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTestOnlineExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestOnlineExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
