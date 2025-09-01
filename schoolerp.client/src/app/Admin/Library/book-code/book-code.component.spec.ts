import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCodeComponent } from './book-code.component';

describe('BookCodeComponent', () => {
  let component: BookCodeComponent;
  let fixture: ComponentFixture<BookCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
