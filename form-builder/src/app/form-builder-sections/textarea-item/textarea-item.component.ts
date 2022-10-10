import { Component, Input, OnDestroy } from '@angular/core';
import { FieldElement, FormElement } from '../interfaces';
import { FormItemStyle } from '../abstract/field.abstract';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { fieldDelete, fieldUpdate } from '../store/form/form.actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ValidatePxFont,
  ValidatePxHeight,
  ValidatePxWidth,
} from '../validate.func';

@Component({
  selector: 'app-textarea-item',
  templateUrl: './textarea-item.component.html',
  styleUrls: ['./textarea-item.component.scss'],
})
export class TextareaItemComponent extends FormItemStyle implements OnDestroy {
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

  protected formStyleGroup: FormGroup = new FormGroup({
    textAreaLabel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    textAreaPlaceholder: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    textAreaWidth: new FormControl('', ValidatePxWidth),
    textAreaHeight: new FormControl('', ValidatePxHeight),
    textAreaFontSize: new FormControl('', ValidatePxFont),
    textAreaFontWeight: new FormControl(''),
    textAreaColor: new FormControl(''),
    textAreaBorderType: new FormControl(''),
    textAreaCheckRequired: new FormControl(''),
  });

  protected applyFieldStyles(): void {
    if (this.formStyleGroup.valid) {
      this.store$.dispatch(
        fieldUpdate({
          id: this.fieldOBJ.id,
          field: 'Textarea',
          fieldLabel: this.formStyleGroup.get('textAreaLabel')?.value!,
          fieldFontSize: this.formStyleGroup.get('textAreaFontSize')?.value!,
          fieldFontWeight:
            this.formStyleGroup.get('textAreaFontWeight')?.value!,
          fieldColor: this.formStyleGroup.get('textAreaColor')?.value!,
          fieldCheckRequired: !!this.formStyleGroup.get('textAreaCheckRequired')
            ?.value!,
          fieldStyles: {
            textAreaPlaceholder: this.formStyleGroup.get('textAreaPlaceholder')
              ?.value!,
            textAreaWidth: this.formStyleGroup.get('textAreaWidth')?.value!,
            textAreaHeight: this.formStyleGroup.get('textAreaHeight')?.value!,
            textAreaBorderType:
              this.formStyleGroup.get('textAreaBorderType')?.value!,
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  get textAreaLabel() {
    return this.formStyleGroup.get('textAreaLabel');
  }
  get textAreaPlaceholder() {
    return this.formStyleGroup.get('textAreaPlaceholder');
  }
  get textAreaWidth() {
    return this.formStyleGroup.get('textAreaWidth');
  }
  get textAreaHeight() {
    return this.formStyleGroup.get('textAreaHeight');
  }
  get textAreaFontSize() {
    return this.formStyleGroup.get('textAreaFontSize');
  }
  get textAreaColor() {
    return this.formStyleGroup.get('textAreaColor');
  }
}
