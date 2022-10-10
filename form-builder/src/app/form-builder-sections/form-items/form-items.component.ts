import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-items',
  templateUrl: './form-items.component.html',
  styleUrls: ['./form-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormItemsComponent {
  fields = ['Input', 'Textarea', 'Button', 'Checkbox', 'Select'];

  constructor() {}
}
