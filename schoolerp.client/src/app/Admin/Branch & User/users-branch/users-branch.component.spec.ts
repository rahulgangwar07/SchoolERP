import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBranchComponent } from './users-branch.component';

describe('UsersBranchComponent', () => {
  let component: UsersBranchComponent;
  let fixture: ComponentFixture<UsersBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
