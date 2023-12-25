import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {AuthState} from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn: MemoizedSelector<any, any> = createSelector(
  selectAuthState,
  auth => !!auth.user
);

export const isLoggedOut: MemoizedSelector<any, any> = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
