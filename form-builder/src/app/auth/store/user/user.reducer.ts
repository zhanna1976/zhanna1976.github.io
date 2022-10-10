import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import {
  lohInFailure,
  lohInSuccess,
  removeUser,
  setUser,
  setUserWithToken,
} from './user.actions';

export const userNode = 'user';

const initialState: User = {
  username: 'user',
  email: '',
  password: '',
  token: '',
  success: false,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, user) => ({ ...state, ...user })),
  on(setUserWithToken, (state, user) => ({ ...state, ...user })),
  on(removeUser, state => ({
    ...state,
    username: 'user',
    email: '',
    password: '',
    token: '',
    success: false,
  })),
  on(lohInSuccess, state => ({ ...state, success: true })),
  on(lohInFailure, state => ({ ...state, success: false }))
);
