import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TSubjectMappingComponent } from './t-subject-mapping.component';

describe('TSubjectMappingComponent', () => {
  let component: TSubjectMappingComponent;
  let fixture: ComponentFixture<TSubjectMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TSubjectMappingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TSubjectMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
