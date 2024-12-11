import { accessTokenSelector } from '../authSlice';
import { useAppSelector } from '../../../app/hooks';

export const useIsLoggedIn = (): boolean => {
  const accessToken = useAppSelector(accessTokenSelector);

  return Boolean(accessToken);
};
