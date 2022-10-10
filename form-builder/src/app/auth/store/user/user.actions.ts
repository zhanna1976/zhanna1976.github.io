import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const setUser = createAction('[User] Set user', props<User>());
export const setUserWithToken = createAction(
  '[User] Set user with token',
  props<User>()
);
export const removeUser = createAction('[User] Remove user');

export const lohInSuccess = createAction('[User] Success');
export const lohInFailure = createAction('[User] Failure');
