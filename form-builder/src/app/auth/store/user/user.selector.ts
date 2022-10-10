import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { userNode } from './user.reducer';

export const selectorContFeature = createFeatureSelector<User>(userNode);

export const getUser = createSelector(
  selectorContFeature,
  (state: User): string => state.username!
);

export const getUsers = createSelector(
  selectorContFeature,
  (state: User): User => state
);
