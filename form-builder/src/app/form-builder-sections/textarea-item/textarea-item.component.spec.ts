import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaItemComponent } from './textarea-item.component';

describe('TextareaItemComponent', () => {
  let component: TextareaItemComponent;
  let fixture: ComponentFixture<TextareaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
