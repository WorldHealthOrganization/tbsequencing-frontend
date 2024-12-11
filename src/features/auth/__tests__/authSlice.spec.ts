import reducer, {
  setUser, setCredentials, setAccess, setRefresh, logout,
} from '../authSlice';
import type { IAuthState } from '../authSlice';
import type { IUser } from '../../../services/indentityApi/models';
import type { ILoginResponse } from '../storeToken';

describe('AuthSlice tests', () => {
  const mockInitialState: IAuthState = {
    accessToken: null,
    refreshToken: null,
  };

  const mockUser: IUser = {
    firstname: 'mockFirstname',
    lastname: 'mockLastname',
    username: 'mockUsername',
    pk: 0,
  };

  test('Reducer should return a proper initialState', () => {
    const returnedInitialState = reducer(undefined, { type: 'MOCK_ACTION_TYPE' });

    expect(mockInitialState).toStrictEqual(returnedInitialState);
  });

  it('Should properly set user to state', () => {
    const expectedState = { ...mockInitialState, user: mockUser };
    const prevUserState = undefined;
    const returnedState = reducer(prevUserState, setUser({ user: mockUser }));

    expect(returnedState).toEqual(expectedState);
  });

  it('Should properly set credentials', () => {
    const mockCredentials: ILoginResponse = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    };

    const expectedState = { ...mockInitialState, ...mockCredentials };
    const returnedState = reducer(undefined, setCredentials(mockCredentials));

    expect(returnedState).toEqual(expectedState);
  });

  it('Should properly set accessToken', () => {
    const mockAccessToken = 'mockAccessToken';
    const expectedState:IAuthState = { ...mockInitialState, accessToken: mockAccessToken };
    const returnedState = reducer(undefined, setAccess({ access: mockAccessToken }));

    expect(returnedState).toEqual(expectedState);
  });

  it('Should properly set refreshToken', () => {
    const mockRefreshToken = 'mockRefreshToken';
    const expectedState:IAuthState = { ...mockInitialState, refreshToken: mockRefreshToken };
    const returnedState = reducer(undefined, setRefresh({ refresh: mockRefreshToken }));

    expect(returnedState).toEqual(expectedState);
  });

  it('Should properly clear token after logout', () => {
    const prevState = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      user: mockUser,
    };

    const expectedState = {
      accessToken: null,
      refreshToken: null,
      user: undefined,
    };

    const returnedState = reducer(prevState, logout());

    expect(returnedState).toEqual(expectedState);
  });
});
