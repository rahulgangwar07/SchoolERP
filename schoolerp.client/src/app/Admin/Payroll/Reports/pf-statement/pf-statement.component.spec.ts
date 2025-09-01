import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfStatementComponent } from './pf-statement.component';

describe('PfStatementComponent', () => {
  let component: PfStatementComponent;
  let fixture: ComponentFixture<PfStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PfStatementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
