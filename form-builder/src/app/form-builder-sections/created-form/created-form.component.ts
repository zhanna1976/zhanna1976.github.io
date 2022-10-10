import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { Observable, Subject, takeUntil } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {
  createFormList,
  createFormStyle,
  getFieldById,
  getSelectOptionsById,
} from '../store/form/form.selector';
import { fieldAdd, saveForm } from '../store/form/form.actions';
import {
  ButtonStyleElement,
  CheckBoxStyleElement,
  FieldElement,
  FieldStyleElement,
  FormElement,
  FormStyle,
  InputStyleElement,
  SelectStyleElement,
  TextAreaStyleElement,
} from '../interfaces';
import { Fields } from '../enums';

@Component({
  selector: 'app-created-form',
  templateUrl: './created-form.component.html',
  styleUrls: ['./created-form.component.scss'],
})
export class CreatedFormComponent implements OnInit, OnDestroy {
  fields: string[] = [];
  fieldObj: FieldElement[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  public form$: Observable<FormStyle> = this.store$.pipe(
    select(createFormStyle),
    takeUntil(this.destroy$)
  );

  public formList$: Observable<FieldStyleElement<any>[]> = this.store$.pipe(
    select(createFormList),
    takeUntil(this.destroy$)
  );

  displaySaveButton(): boolean {
    let displayFlag: boolean = false;
    this.formList$.subscribe(items => {
      items.length ? (displayFlag = true) : (displayFlag = false);
    });
    return displayFlag;
  }

  saveForm() {
    this.store$.dispatch(saveForm());
    this.store$.subscribe(item => console.log(item));
  }

  public formStyles: FormStyle = { formLabel: 'Form label' };

  @Output() fieldStyleEvent = new EventEmitter<FieldElement>();

  getSelectOptions(id: string) {
    return this.store$.pipe(
      select(getSelectOptionsById(id)),
      takeUntil(this.destroy$)
    );
  }

  getInputStyle(id: string, type: string) {
    let inputStyle: string = '';
    let labelText: string = '';
    let placeholderText: string = '';
    let requireStyle: boolean = false;
    this.store$
      .select(getFieldById(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => {
        inputStyle =
          'width: ' +
          item?.fieldStyles.inputWidth +
          '; height: ' +
          item?.fieldStyles.inputHeight +
          '; border-style: ' +
          item?.fieldStyles.inputBorderType +
          '; color: ' +
          item?.fieldColor +
          '; font-size: ' +
          item?.fieldFontSize +
          '; font-weight: ' +
          item?.fieldFontWeight;
        labelText = item?.fieldLabel + '';
        requireStyle = !!item?.fieldCheckRequired;
        placeholderText = item?.fieldStyles.inputPlaceholder + '';
      });

    if (type === 'input') {
      return inputStyle;
    } else if (type === 'label') {
      return labelText;
    } else if (type === 'placeholder') {
      return placeholderText;
    } else if (type === 'required') {
      return requireStyle;
    }
    return;
  }

  getSelectStyle(id: string, type: string) {
    let selectStyle: string = '';
    let labelText: string = '';
    let labelStyle: string = '';
    let requireStyle: boolean = false;
    this.store$
      .select(getFieldById(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => {
        selectStyle =
          'width: ' +
          item?.fieldStyles.selectWidth +
          '; height: ' +
          item?.fieldStyles.selectHeight +
          '; border-style: ' +
          item?.fieldStyles.selectBorderType +
          '; background-color: ' +
          item?.fieldColor +
          '; font-size: ' +
          item?.fieldFontSize +
          '; font-weight: ' +
          item?.fieldFontWeight;
        labelStyle =
          'font-size: ' +
          item?.fieldFontSize +
          '; font-weight: ' +
          item?.fieldFontWeight;
        labelText = item?.fieldLabel + '';
        requireStyle = !!item?.fieldCheckRequired;
      });
    if (type === 'select') {
      return selectStyle;
    } else if (type === 'label') {
      return labelText;
    } else if (type === 'labelStyle') {
      return labelText;
    } else if (type === 'required') {
      return requireStyle;
    }
    return;
  }

  getTextAreaStyle(id: string, type: string) {
    let textAreaStyle: string = '';
    let labelText: string = '';
    let placeholderText: string = '';
    let requireStyle: boolean = false;
    this.store$
      .select(getFieldById(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => {
        textAreaStyle =
          'width: ' +
          item?.fieldStyles.textAreaWidth +
          '; height: ' +
          item?.fieldStyles.textAreaHeight +
          '; border-style: ' +
          item?.fieldStyles.textAreaBorderType +
          '; color: ' +
          item?.fieldColor +
          '; font-size: ' +
          item?.fieldFontSize +
          '; font-weight: ' +
          item?.fieldFontWeight;
        labelText = item?.fieldLabel + '';
        requireStyle = !!item?.fieldCheckRequired;
        placeholderText = item?.fieldStyles.textAreaPlaceholder + '';
      });
    if (type === 'textArea') {
      return textAreaStyle;
    } else if (type === 'label') {
      return labelText;
    } else if (type === 'placeholder') {
      return placeholderText;
    } else if (type === 'required') {
      return requireStyle;
    }
    return;
  }

  getButtonStyle(id: string, type: string) {
    let buttonStyle: string = '';
    let labelText: string = '';
    let requireStyle: boolean = false;
    this.store$
      .select(getFieldById(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => {
        buttonStyle =
          'width: ' +
          item?.fieldStyles.buttonWidth +
          '; height: ' +
          item?.fieldStyles.buttonHeight +
          '; border-style: ' +
          item?.fieldStyles.buttonBorderType +
          '; color: ' +
          item?.fieldColor +
          '; font-size: ' +
          item?.fieldFontSize +
          '; font-weight: ' +
          item?.fieldFontWeight +
          '; background-color: ' +
          item?.fieldStyles.buttonColorBackground;
        labelText = item?.fieldLabel + '';
        requireStyle = !!item?.fieldCheckRequired;
      });
    if (type === 'button') {
      return buttonStyle;
    } else if (type === 'label') {
      return labelText;
    } else if (type === 'required') {
      return requireStyle;
    }
    return;
  }

  getCheckBoxStyle(id: string, type: string) {
    let checkBoxStyle: string = '';
    let labelText: string = '';
    let titleText: string = '';
    let requireStyle: boolean = false;
    this.store$
      .select(getFieldById(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe(item => {
        checkBoxStyle =
          'color: ' +
          item?.fieldColor +
          '; font-size: ' +
          item?.fieldFontSize +
          '; font-weight: ' +
          item?.fieldFontWeight;
        labelText = item?.fieldLabel + '';
        titleText = item?.fieldStyles.checkBoxTitle + '';
        requireStyle = !!item?.fieldCheckRequired;
      });
    if (type === 'checkBox') {
      return checkBoxStyle;
    } else if (type === 'label') {
      return labelText;
    } else if (type === 'required') {
      return requireStyle;
    } else if (type === 'title') {
      return titleText;
    }
    return;
  }

  get id() {
    return uuidv4();
  }

  getField(field: string, id: string) {
    this.fieldStyleEvent.emit({
      field: field,
      id: id,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const fieldType = event.container.data[event.currentIndex];

    if (fieldType === Fields.input) {
      const addFieldInput: FieldStyleElement<InputStyleElement> = {
        fieldLabel: 'Input label',
        fieldStyles: {
          inputPlaceholder: 'Input placeholder',
        },
        field: event.container.data[event.currentIndex],
        id: event.container.data[event.currentIndex] + uuidv4(),
      };
      this.store$.dispatch(fieldAdd({ ...addFieldInput }));
    } else if (fieldType === Fields.select) {
      const addFieldSelect: FieldStyleElement<SelectStyleElement> = {
        fieldLabel: 'Select',
        fieldStyles: {
          selectAddOption: [],
        },
        field: event.container.data[event.currentIndex],
        id: event.container.data[event.currentIndex] + uuidv4(),
      };
      this.store$.dispatch(fieldAdd({ ...addFieldSelect }));
    } else if (fieldType === Fields.textArea) {
      const addFieldTextArea: FieldStyleElement<TextAreaStyleElement> = {
        fieldLabel: 'Textarea',
        fieldStyles: {
          textAreaPlaceholder: '',
        },
        field: event.container.data[event.currentIndex],
        id: event.container.data[event.currentIndex] + uuidv4(),
      };
      this.store$.dispatch(fieldAdd({ ...addFieldTextArea }));
    } else if (fieldType === Fields.checkBox) {
      const addFieldCheckBox: FieldStyleElement<CheckBoxStyleElement> = {
        fieldLabel: 'CheckBox',
        fieldStyles: {
          checkBoxTitle: 'CheckBox title',
        },
        field: event.container.data[event.currentIndex],
        id: event.container.data[event.currentIndex] + uuidv4(),
      };
      this.store$.dispatch(fieldAdd({ ...addFieldCheckBox }));
    } else if (fieldType === Fields.button) {
      const addFieldButton: FieldStyleElement<ButtonStyleElement> = {
        fieldLabel: 'Button',
        fieldStyles: {},
        field: event.container.data[event.currentIndex],
        id: event.container.data[event.currentIndex] + uuidv4(),
      };
      this.store$.dispatch(fieldAdd({ ...addFieldButton }));
    }
  }

  constructor(private store$: Store<FormElement>) {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.form$.subscribe(value => {
      this.formStyles = value;
    });
  }
}
