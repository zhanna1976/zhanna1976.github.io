import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formNode } from './form.reducer';
import { FieldStyleElement, FormElement, FormStyle } from '../../interfaces';

export const selectorContFeature = createFeatureSelector<FormElement>(formNode);

export const createFormStyle = createSelector(
  selectorContFeature,
  (state: FormElement): FormStyle => state.formGeneral
);

export const createFormList = createSelector(
  selectorContFeature,
  (state: FormElement): FieldStyleElement<any>[] => state.formList
);

export const getFieldById = (id: string) =>
  createSelector(selectorContFeature, allItems => {
    if (allItems.formList) {
      return allItems.formList.find(item => {
        return item.id === id;
      });
    } else {
      return;
    }
  });

export const getSelectOptionsById = (id: string) =>
  createSelector(selectorContFeature, allItems => {
    let item: string[] | undefined;
    if (allItems.formList) {
      allItems.formList.forEach(select => {
        if (select.id === id) {
          item = select.fieldStyles.selectAddOption;
        }
      });
      return item!;
    } else {
      return [];
    }
  });
