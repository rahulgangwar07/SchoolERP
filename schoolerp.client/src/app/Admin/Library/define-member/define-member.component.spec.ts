import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineMemberComponent } from './define-member.component';

describe('DefineMemderComponent', () => {
  let component: DefineMemberComponent;
  let fixture: ComponentFixture<DefineMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefineMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
