import { getPathFromLocation, getPrevPathFromLocation } from '../location';

describe('Location utils tests', () => {
  describe('getPathFromLocation tests', () => {
    const mockLastSegment = 'mock3';
    const mockPath = `https://music.youtube.com/mock1/mock2/${mockLastSegment}`;

    it('Should return a proper last path of', () => {
      const actualResult = getPathFromLocation(mockPath);

      expect(actualResult).toBe(mockLastSegment);
    });

    it('Should not contain / in result', () => {
      const actualResult = getPathFromLocation(mockPath);
      const containsSlash = actualResult.includes('/');

      expect(containsSlash).toBeFalsy();
    });
  });

  describe('getPrevPathFromLocation', () => {
    const mockSegment0 = 'mockSegment0';
    const mockSegment1 = 'mockSegment1';
    const mockSegment2 = 'mockSegment2';
    const mockPath = `https://music.youtube.com/${mockSegment0}/${mockSegment1}/${mockSegment2}`;

    it('Should return proper using function without offset param', () => {
      const result = getPrevPathFromLocation(mockPath);

      expect(result).toBe(mockSegment1);
    });

    it('Should return proper part of path using function with offset param 1', () => {
      const result = getPrevPathFromLocation(mockPath, 1);

      expect(result).toBe(mockSegment2);
    });

    it('Should return proper part of path using function with offset param 3', () => {
      const result = getPrevPathFromLocation(mockPath, 3);

      expect(result).toBe(mockSegment0);
    });

    test('Result should not contain / symbol', () => {
      const result = getPrevPathFromLocation(mockPath);
      const foundSlash = result.includes('/');

      expect(foundSlash).toBeFalsy();
    });
  });
});
