import { Component, Input, OnDestroy } from '@angular/core';
import { FieldElement, FormElement } from '../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormItemStyle } from '../abstract/field.abstract';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { fieldDelete, fieldUpdate } from '../store/form/form.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatePxFont } from '../validate.func';

@Component({
  selector: 'app-checkbox-item',
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.scss'],
})
export class CheckboxItemComponent extends FormItemStyle implements OnDestroy {
  @Input() fieldOBJ: FieldElement = {
    field: '',
    id: '',
  };

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected override store$: Store<FormElement>,
    protected override dialog: MatDialog
  ) {
    super(store$, dialog);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  protected formStyleGroup: FormGroup = new FormGroup({
    checkBoxLabel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    checkBoxFontSize: new FormControl('', ValidatePxFont),
    checkBoxFontWeight: new FormControl(''),
    checkBoxColor: new FormControl(''),
    checkBoxCheckRequired: new FormControl(''),
    checkBoxTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  get checkBoxLabel() {
    return this.formStyleGroup.get('checkBoxLabel');
  }
  get checkBoxTitle() {
    return this.formStyleGroup.get('checkBoxTitle');
  }
  get checkBoxFontSize() {
    return this.formStyleGroup.get('checkBoxFontSize');
  }
  get checkBoxColor() {
    return this.formStyleGroup.get('checkBoxColor');
  }

  protected applyFieldStyles(): void {
    if (this.formStyleGroup.valid) {
      this.store$.dispatch(
        fieldUpdate({
          id: this.fieldOBJ.id,
          field: 'Checkbox',
          fieldLabel: this.formStyleGroup.get('checkBoxLabel')?.value!,
          fieldFontSize: this.formStyleGroup.get('checkBoxFontSize')?.value!,
          fieldFontWeight:
            this.formStyleGroup.get('checkBoxFontWeight')?.value!,
          fieldColor: this.formStyleGroup.get('checkBoxColor')?.value!,
          fieldCheckRequired: !!this.formStyleGroup.get('checkBoxCheckRequired')
            ?.value!,
          fieldStyles: {
            checkBoxTitle: this.formStyleGroup.get('checkBoxTitle')?.value!,
          },
        })
      );
    }
  }

  protected deleteField(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          this.store$.dispatch(
            fieldDelete({
              id: this.fieldOBJ.id,
            })
          );
          this.formStyleGroup.reset();
        }
      });
  }
}
