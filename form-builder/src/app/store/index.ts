import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { FormElement } from '../form-builder-sections/interfaces';
import {
  formReducer,
  formNode,
} from '../form-builder-sections/store/form/form.reducer';

export interface State {
  [formNode]: FormElement;
}

export const reducers: ActionReducerMap<State, any> = {
  [formNode]: formReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
