import * as Sentry from '@sentry/react';
import { sentryDSN } from './environment';

export const initSentry = () => {
  if (typeof sentryDSN !== 'undefined' && sentryDSN !== null) {
    Sentry.init({
      dsn: sentryDSN,
    });
  }
};
