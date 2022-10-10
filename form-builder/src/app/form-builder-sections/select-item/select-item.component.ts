import { Component, Input, OnDestroy } from '@angular/core';
import { FieldElement, FormElement } from '../interfaces';
import { Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormItemStyle } from '../abstract/field.abstract';
import {
  fieldDelete,
  fieldUpdate,
  selectAddOption,
} from '../store/form/form.actions';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { getSelectOptionsById } from '../store/form/form.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ValidatePxFont,
  ValidatePxHeight,
  ValidatePxWidth,
} from '../validate.func';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent extends FormItemStyle implements OnDestroy {
  @Input() fieldOBJ: FieldElement = {
    field: '',
    id: '',
  };

  destroy$: Subject<boolean> = new Subject<boolean>();

  selectOptions: string[] = [];

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

  addOptionSelect() {
    if (this.formStyleGroup.get('selectAddOption')?.valid) {
      this.store$.dispatch(
        selectAddOption({
          id: this.fieldOBJ.id,
          option: this.formStyleGroup.get('selectAddOption')?.value!,
        })
      );
    }
  }

  protected formStyleGroup: FormGroup = new FormGroup({
    selectLabel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    selectWidth: new FormControl('', ValidatePxWidth),
    selectHeight: new FormControl('', ValidatePxHeight),
    selectFontSize: new FormControl('', ValidatePxFont),
    selectFontWeight: new FormControl(''),
    selectColor: new FormControl(''),
    selectBorderType: new FormControl(''),
    selectCheckRequired: new FormControl(''),
    selectAddOption: new FormControl('', Validators.minLength(3)),
  });

  protected applyFieldStyles(): void {
    if (this.formStyleGroup.valid) {
      this.store$
        .pipe(
          select(getSelectOptionsById(this.fieldOBJ.id)),
          takeUntil(this.destroy$)
        )
        .subscribe(items => {
          this.selectOptions = items;
        });
      this.store$.dispatch(
        fieldUpdate({
          id: this.fieldOBJ.id,
          field: 'Select',
          fieldLabel: this.formStyleGroup.get('selectLabel')?.value!,
          fieldFontSize: this.formStyleGroup.get('selectFontSize')?.value!,
          fieldFontWeight: this.formStyleGroup.get('selectFontWeight')?.value!,
          fieldColor: this.formStyleGroup.get('selectColor')?.value!,
          fieldCheckRequired: !!this.formStyleGroup.get('selectCheckRequired')
            ?.value!,
          fieldStyles: {
            selectWidth: this.formStyleGroup.get('selectWidth')?.value!,
            selectHeight: this.formStyleGroup.get('selectHeight')?.value!,
            selectBorderType:
              this.formStyleGroup.get('selectBorderType')?.value!,
            selectAddOption: this.selectOptions!,
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

  get selectLabel() {
    return this.formStyleGroup.get('selectLabel');
  }
  get selectAddOption() {
    return this.formStyleGroup.get('selectAddOption');
  }
  get selectWidth() {
    return this.formStyleGroup.get('selectWidth');
  }
  get selectHeight() {
    return this.formStyleGroup.get('selectHeight');
  }
  get selectFontSize() {
    return this.formStyleGroup.get('selectFontSize');
  }
  get selectColor() {
    return this.formStyleGroup.get('selectColor');
  }
}
