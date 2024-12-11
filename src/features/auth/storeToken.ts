import { IUser } from '../../services/indentityApi/models';

export interface ITokenInfo {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface ILoginResponse extends ITokenInfo {
  user: IUser;
}

const authPrefix = 'auth';
export const ACCESS_TOKEN_KEY = `${authPrefix}/accessToken`;
export const REFRESH_TOKEN_KEY = `${authPrefix}/refreshToken`;

export const setRefreshToken = (refresh: string | null) => {
  if (refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
};

export const setAccessToken = (access: string | null) => {
  if (access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  }
};

export const setTokens = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const getTokens = (): ITokenInfo => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

  return {
    accessToken,
    refreshToken,
  };
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
