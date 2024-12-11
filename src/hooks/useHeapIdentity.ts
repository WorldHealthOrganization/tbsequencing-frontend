import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { heapIdentify, heapRemoveUserProps } from '../utils/heapAnalytics';

export const useHeapIdentity = () => {
  const { accounts } = useMsal();

  useEffect(() => {
    if (accounts[0]) {
      heapIdentify(Number(accounts[0].tenantId));
      heapRemoveUserProps();
    }
  }, [accounts]);
};
