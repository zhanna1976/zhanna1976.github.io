import { Component, Input, OnDestroy } from '@angular/core';
import { FieldElement, FormElement } from '../interfaces';
import { FormItemStyle } from '../abstract/field.abstract';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { fieldDelete, fieldUpdate } from '../store/form/form.actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import {
  ValidatePxFont,
  ValidatePxHeight,
  ValidatePxWidth,
} from '../validate.func';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.scss'],
})
export class InputItemComponent extends FormItemStyle implements OnDestroy {
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
    inputLabel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    inputPlaceholder: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    inputWidth: new FormControl('', ValidatePxWidth),
    inputHeight: new FormControl('', ValidatePxHeight),
    inputFontSize: new FormControl('', ValidatePxFont),
    inputFontWeight: new FormControl(''),
    inputColor: new FormControl(''),
    inputBorderType: new FormControl(''),
    inputCheckRequired: new FormControl(''),
  });

  protected applyFieldStyles(): void {
    if (this.formStyleGroup.valid) {
      this.store$.dispatch(
        fieldUpdate({
          id: this.fieldOBJ.id,
          field: 'Input',
          fieldLabel: this.formStyleGroup.get('inputLabel')?.value!,
          fieldFontSize: this.formStyleGroup.get('inputFontSize')?.value!,
          fieldFontWeight: this.formStyleGroup.get('inputFontSize')?.value!,
          fieldColor: this.formStyleGroup.get('inputColor')?.value!,
          fieldCheckRequired:
            !!this.formStyleGroup.get('inputCheckRequired')?.value!,
          fieldStyles: {
            inputPlaceholder:
              this.formStyleGroup.get('inputPlaceholder')?.value!,
            inputWidth: this.formStyleGroup.get('inputWidth')?.value!,
            inputHeight: this.formStyleGroup.get('inputHeight')?.value!,
            inputBorderType: this.formStyleGroup.get('inputBorderType')?.value!,
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

  get inputLabel() {
    return this.formStyleGroup.get('inputLabel');
  }
  get inputPlaceholder() {
    return this.formStyleGroup.get('inputPlaceholder');
  }
  get inputWidth() {
    return this.formStyleGroup.get('inputWidth');
  }
  get inputHeight() {
    return this.formStyleGroup.get('inputHeight');
  }
  get inputFontSize() {
    return this.formStyleGroup.get('inputFontSize');
  }
  get inputColor() {
    return this.formStyleGroup.get('inputColor');
  }
}
