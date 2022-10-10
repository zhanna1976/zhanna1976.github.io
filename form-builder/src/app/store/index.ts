import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { FormElement } from '../form-builder-sections/interfaces';
import { User } from '../auth/models/user';
import {
  formReducer,
  formNode,
} from '../form-builder-sections/store/form/form.reducer';
import { userReducer, userNode } from '../auth/store/user/user.reducer';

export interface State {
  [formNode]: FormElement;
  [userNode]: User;
}

export const reducers: ActionReducerMap<State, any> = {
  [formNode]: formReducer,
  [userNode]: userReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
