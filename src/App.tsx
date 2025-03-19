import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  CssBaseline,
} from '@mui/material';
import { MsalProvider } from '@azure/msal-react';

// import * as Sentry from '@sentry/react';
import TagManager from 'react-gtm-module';

import { AppRoutes } from './navigation/routes';
import AppBar from './components/AppBar';
import AppDrawer from './features/drawer/components/AppDrawer';
import { useTokenRotation } from './features/auth/hooks/useTokenRotation';
// import ErrorHandler from './components/ErrorHandler';
// import Feedback from './components/Feedback';
// import { isProd } from './utils/environment';
// import { useCookiebotConsent } from './utils/cookiebot';

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_ID || '',
};

const App = ({ instance }: any) => {
  useTokenRotation();
  // useCookiebotConsent();
  if (tagManagerArgs.gtmId) {
    TagManager.initialize(tagManagerArgs);
  }

  return (
    <div className="App">
      {instance ? (
        <MsalProvider instance={instance}>
          <AppBar />
          <AppDrawer />
          <AppRoutes />
          <CssBaseline />
          <ToastContainer position="bottom-left" />
          {/* <Feedback /> */}
        </MsalProvider>
      ) : null}
    </div>
  );
};

export default App;
