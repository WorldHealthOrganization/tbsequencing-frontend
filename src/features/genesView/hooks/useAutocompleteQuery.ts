import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useGetGenesQuery } from '../../../services/genesApi/genesApi';
import { AutocompleteParams } from '../models';

export const useAutocompleteQuery = () => {
  const [queryParams, setQueryParams] = useState<AutocompleteParams>(skipToken);
  const {
    data,
    isLoading,
    refetch,
  } = useGetGenesQuery(queryParams, { refetchOnMountOrArgChange: true });

  const fetchData = (params: { search: string }) => {
    setQueryParams(params);
  };

  return {
    data, isLoading, fetchData, refetch,
  };
};
