import { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { heapIdentify, heapLoad, heapRemoveUserProps } from './heapAnalytics';

const listenerName = 'CookiebotOnAccept';
const heapKey = process.env.REACT_APP_HEAP_APP_ID;

export const useCookiebotConsent = () => {
  const [coockiesAccepted, setCoockiesAccepted] = useState<boolean>(false);

  const { accounts } = useMsal();
  const heapLoaded = window.heap.loaded;

  const onCookiesAccept = () => {
    const isCookiesAccepted = window.Cookiebot.consent.statistics;

    setCoockiesAccepted(isCookiesAccepted);
  };

  useEffect(() => {
    if (!coockiesAccepted) {
      return;
    }

    heapLoad(heapKey);

    if (accounts[0]) {
      heapIdentify(Number(accounts[0].tenantId));
      heapRemoveUserProps();
    }
  }, [accounts, heapLoaded, coockiesAccepted]);

  useEffect(() => {
    window.addEventListener(listenerName, onCookiesAccept);

    return () => {
      window.removeEventListener(listenerName, onCookiesAccept);
    };
  }, []);
};
