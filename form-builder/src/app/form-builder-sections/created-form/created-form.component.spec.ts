import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedFormComponent } from './created-form.component';

describe('CreatedFormComponent', () => {
  let component: CreatedFormComponent;
  let fixture: ComponentFixture<CreatedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatedFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
