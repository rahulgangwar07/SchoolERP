import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantListsDatesComponent } from './important-lists-dates.component';

describe('ImportantListsDatesComponent', () => {
  let component: ImportantListsDatesComponent;
  let fixture: ComponentFixture<ImportantListsDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportantListsDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantListsDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
