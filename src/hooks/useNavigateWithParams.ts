import { createSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateWithParams = () => {
  const navigate = useNavigate();

  return (pathname: string, params: URLSearchParams) => {
    navigate({ pathname, search: `?${createSearchParams(params)}` });
  };
};
