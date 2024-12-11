export const isDev = () => !process.env.REACT_APP_NODE_ENV
  || process.env.REACT_APP_NODE_ENV === 'development';

export const isProd = !isDev();

export const sentryDSN = process.env.REACT_APP_SENTRY_DSN;
