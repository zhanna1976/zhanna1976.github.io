import { Component, Input, OnDestroy } from '@angular/core';
import { FieldElement, FormElement } from '../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormItemStyle } from '../abstract/field.abstract';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { fieldDelete, fieldUpdate } from '../store/form/form.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ValidatePxFont,
  ValidatePxHeight,
  ValidatePxWidth,
} from '../validate.func';

@Component({
  selector: 'app-button-item',
  templateUrl: './button-item.component.html',
  styleUrls: ['./button-item.component.scss'],
})
export class ButtonItemComponent extends FormItemStyle implements OnDestroy {
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
    buttonLabel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    buttonWidth: new FormControl('', ValidatePxWidth),
    buttonHeight: new FormControl('', ValidatePxHeight),
    buttonFontSize: new FormControl('', ValidatePxFont),
    buttonFontWeight: new FormControl(''),
    buttonColor: new FormControl(''),
    buttonColorBackground: new FormControl(''),
    buttonBorderType: new FormControl(''),
    buttonCheckRequired: new FormControl(''),
  });

  protected applyFieldStyles(): void {
    if (this.formStyleGroup.valid) {
      this.store$.dispatch(
        fieldUpdate({
          id: this.fieldOBJ.id,
          field: 'Button',
          fieldLabel: this.formStyleGroup.get('buttonLabel')?.value!,
          fieldFontSize: this.formStyleGroup.get('buttonFontSize')?.value!,
          fieldFontWeight: this.formStyleGroup.get('buttonFontWeight')?.value!,
          fieldColor: this.formStyleGroup.get('buttonColor')?.value!,
          fieldCheckRequired: !!this.formStyleGroup.get('buttonCheckRequired')
            ?.value!,
          fieldStyles: {
            buttonWidth: this.formStyleGroup.get('buttonWidth')?.value!,
            buttonHeight: this.formStyleGroup.get('buttonHeight')?.value!,
            buttonColorBackground: this.formStyleGroup.get(
              'buttonColorBackground'
            )?.value!,
            buttonBorderType:
              this.formStyleGroup.get('buttonBorderType')?.value!,
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

  get buttonLabel() {
    return this.formStyleGroup.get('buttonLabel');
  }
  get buttonWidth() {
    return this.formStyleGroup.get('buttonWidth');
  }
  get buttonHeight() {
    return this.formStyleGroup.get('buttonHeight');
  }
  get buttonFontSize() {
    return this.formStyleGroup.get('buttonFontSize');
  }
  get buttonColor() {
    return this.formStyleGroup.get('buttonColor');
  }
  get buttonColorBackground() {
    return this.formStyleGroup.get('buttonColorBackground');
  }
}
