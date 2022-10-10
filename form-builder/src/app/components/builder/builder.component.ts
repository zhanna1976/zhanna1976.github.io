import { Component } from '@angular/core';
import { FieldElement } from '../../form-builder-sections/interfaces';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
})
export class BuilderComponent {
  public field: FieldElement = {
    field: '',
    id: '',
  };

  getField(field: FieldElement) {
    this.field = field;
  }

  constructor() {}
}
