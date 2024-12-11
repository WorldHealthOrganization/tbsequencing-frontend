import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getTokens, setTokens, ITokenInfo,
} from './storeToken';
import type { RootState } from '../../app/store';
import { IUser } from '../../services/indentityApi/models';

export interface IAuthState extends ITokenInfo {
  user?: IUser;
}

const initialState: IAuthState = { ...getTokens() };

export const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      setUserSSO(state, { payload }) {
        state.user = payload;
      },
      setCredentialsSSO(state, { payload }) {
        state.accessToken = payload;
        state.refreshToken = null;
        setTokens(payload.accessToken, null);
      },
      setUser(state, { payload }) {
        state.user = payload.user;
      },
      setCredentials(state, { payload }: PayloadAction<IAuthState>) {
        const { accessToken, refreshToken } = payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        setTokens(accessToken, refreshToken);
      },
      setRefresh(state, { payload }) {
        state.refreshToken = payload.refresh;
      },
      setAccess(state, { payload }) {
        state.accessToken = payload.access;
      },
      logout(state) {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = undefined;
      },
    },
    extraReducers: () => {},
  },
);

export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
export const refreshTokenSelector = (state: RootState) => state.auth.refreshToken;
export const userSelector = (state: RootState) => state.auth.user;

export const {
  setUserSSO,
  setCredentialsSSO,
  setCredentials,
  setRefresh,
  setUser,
  logout,
  setAccess,
} = authSlice.actions;

export default authSlice.reducer;
