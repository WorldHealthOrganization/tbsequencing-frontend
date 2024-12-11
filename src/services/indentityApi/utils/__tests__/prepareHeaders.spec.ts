import * as headerUtils from '../prepareHeaders';
import type { ReduxApiType } from '../prepareHeaders';

describe('Prepare headers tests', () => {
  describe('attachBearer tests', () => {
    const mockToken = 'mockToken';
    it('Should properly attach bearer prefix to token', () => {
      const bearerString = headerUtils.attachBearer(mockToken);
      const bearerAttached = bearerString.includes('Bearer');

      expect(bearerAttached).toBeTruthy();
    });

    it('Should contain attached token', () => {
      const headerString = headerUtils.attachBearer(mockToken);
      const tokenAttached = headerString.includes(mockToken);

      expect(tokenAttached).toBeTruthy();
    });
  });

  describe('prepareHeaders tests', () => {
    const mockAccessToken = 'mockAccessToken';
    const mockHeaders = new Headers();
    const mockGetState = () => ({ auth: { accessToken: mockAccessToken, refreshToken: 'mockRefreshToken' } });
    const resultHeaders = headerUtils.prepareHeaders(
      mockHeaders,
      { getState: mockGetState } as ReduxApiType,
    );
    const mockExpectedResultHeaders = new Headers();
    mockExpectedResultHeaders.set('authorization', `Bearer ${mockAccessToken}`);

    it('Should properly attach accessToken to headers', () => {
      expect(resultHeaders).toEqual(mockExpectedResultHeaders);
    });

    it('Should attach a VALID header', () => {
      const accessTokenHeader = resultHeaders.get('authorization');

      const includesAccessToken = accessTokenHeader?.includes(mockAccessToken);
      const includesBearer = accessTokenHeader?.includes('Bearer');

      expect(includesBearer).toBeTruthy();
      expect(includesAccessToken).toBeTruthy();
    });
  });
});
