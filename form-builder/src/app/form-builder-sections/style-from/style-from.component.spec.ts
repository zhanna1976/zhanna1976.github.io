import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleFromComponent } from './style-from.component';

describe('StyleFromComponent', () => {
  let component: StyleFromComponent;
  let fixture: ComponentFixture<StyleFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleFromComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StyleFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
