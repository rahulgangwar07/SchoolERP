import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIssuedBookComponent } from './search-issued-book.component';

describe('SearchStaffIssuedBookComponent', () => {
  let component: SearchIssuedBookComponent;
  let fixture: ComponentFixture<SearchIssuedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchIssuedBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchIssuedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
