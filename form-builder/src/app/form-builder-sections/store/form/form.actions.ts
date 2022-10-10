import { createAction, props } from '@ngrx/store';
import { FormStyle } from '../../interfaces';

export const fieldAdd = createAction('[FORM].fieldADD', props<any>());

export const fieldUpdate = createAction('[FORM].fieldUpdate', props<any>());

export const fieldDelete = createAction(
  '[FORM].fieldDelete',
  props<{ id: string }>()
);

export const selectAddOption = createAction(
  '[FORM].selectAddOption',
  props<{
    id: string;
    option: string;
  }>()
);

export const formStyleAdd = createAction(
  '[FORM].formStyleADD',
  props<FormStyle>()
);

export const saveForm = createAction('[FORM].saveForm');
