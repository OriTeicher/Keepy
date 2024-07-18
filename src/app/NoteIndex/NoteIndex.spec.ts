import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteIndexComponent } from './NoteIndex';

describe('NoteIndexComponent', () => {
  let component: NoteIndexComponent;
  let fixture: ComponentFixture<NoteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteIndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
