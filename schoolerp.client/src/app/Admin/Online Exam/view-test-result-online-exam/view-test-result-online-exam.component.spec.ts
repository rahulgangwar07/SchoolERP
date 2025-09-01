import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestResultOnlineExamComponent } from './view-test-result-online-exam.component';

describe('ViewTestResultOnlineExamComponent', () => {
  let component: ViewTestResultOnlineExamComponent;
  let fixture: ComponentFixture<ViewTestResultOnlineExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTestResultOnlineExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestResultOnlineExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
