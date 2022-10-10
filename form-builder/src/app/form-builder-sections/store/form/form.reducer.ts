import {
  fieldAdd,
  fieldDelete,
  fieldUpdate,
  formStyleAdd,
  saveForm,
  selectAddOption,
} from './form.actions';
import { createReducer, on } from '@ngrx/store';
import { FormElement } from '../../interfaces';

export const formNode = 'form';

const initialState: FormElement = {
  formGeneral: {
    formLabel: 'Form label',
    colorRGB: '',
    borderColorRGB: '',
    backgroundRGB: '',
    borderStyle: '',
  },
  formList: [],
  forms: [],
};

export const formReducer = createReducer(
  initialState,
  on(saveForm, state => ({
    ...initialState,
    forms: [...state.forms, [...state.formList]],
  })),
  on(fieldAdd, (state, field) => ({
    ...state,
    formList: [...state.formList, { ...field }],
  })),
  on(fieldDelete, (state, { id }) => ({
    ...state,
    formList: [...state.formList.filter(field => field.id !== id)],
  })),
  on(formStyleAdd, (state, form) => ({
    ...state,
    formGeneral: { ...state.formGeneral, ...form },
  })),

  on(fieldUpdate, (state, fieldUpdate) => ({
    ...state,
    formList: [
      ...state.formList.map(field => {
        return field.id === fieldUpdate.id ? fieldUpdate : field;
      }),
    ],
  })),
  on(selectAddOption, (state, option) => ({
    ...state,
    formList: [
      ...state.formList.map(field => {
        return field.id === option.id
          ? {
              ...field,
              fieldStyles: {
                ...field.fieldStyles,
                selectAddOption: [
                  ...field.fieldStyles.selectAddOption,
                  option.option,
                ],
              },
            }
          : field;
      }),
    ],
  }))
);
