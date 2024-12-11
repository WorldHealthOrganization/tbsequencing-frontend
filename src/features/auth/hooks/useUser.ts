import { useGetUserQuery } from '../../../services/indentityApi/identityApi';

export const useUser = () => {
  const {
    isLoading, data, error, isFetching,
  } = useGetUserQuery();

  return {
    isUserLoading: isLoading,
    userData: error ? undefined : data,
    userError: error,
    fullName: `${data?.firstName} ${data?.lastName}`,
    isUserFetching: isFetching,
  };
};
