import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormElement } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';

export abstract class FormItemStyle {
  protected abstract formStyleGroup: FormGroup;
  protected abstract applyFieldStyles(): void;
  protected abstract deleteField(): void;

  protected constructor(
    protected store$: Store<FormElement>,
    protected dialog: MatDialog
  ) {}
}
