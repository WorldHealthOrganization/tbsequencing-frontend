import { useSearchParams } from 'react-router-dom';

export const usePackageName = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('packageName');

  return name;
};
