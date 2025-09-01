import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestOnlineExamComponent } from './add-test-online-exam.component';

describe('AddTestOnlineExamComponent', () => {
  let component: AddTestOnlineExamComponent;
  let fixture: ComponentFixture<AddTestOnlineExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTestOnlineExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestOnlineExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
