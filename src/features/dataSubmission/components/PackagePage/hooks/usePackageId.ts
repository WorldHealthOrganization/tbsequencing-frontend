import { useLocation } from 'react-router-dom';
import { getPathFromLocation } from '../../../../../utils/location';

export const usePackageId = () => {
  const { pathname } = useLocation();
  const packageId = +getPathFromLocation(pathname);

  return packageId;
};
