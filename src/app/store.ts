import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { identityApi } from '../services/indentityApi/identityApi';
import authReducer from '../features/auth/authSlice';
import { dictionariesApi } from '../services/dictionariesApi/dictionariesApi';
import { submissionApi } from '../services/submissionApi/submissionApi';
import { overviewApi } from '../services/overviewApi/overviewApi';
import drugsApi from '../services/drugsApi';
import genesApi from '../services/genesApi';

import drawerReducer from '../features/drawer/drawerSlice';
import { s3Api } from '../services/s3Api/s3Api';
import { feederApi } from '../services/feederApi/feederApi';
import dataSubmissionReducer from '../features/dataSubmission/dataSubmissionSlice';

export const reducer = {
  [identityApi.reducerPath]: identityApi.reducer,
  [dictionariesApi.reducerPath]: dictionariesApi.reducer,
  [drugsApi.reducerPath]: drugsApi.reducer,
  [genesApi.reducerPath]: genesApi.reducer,
  [submissionApi.reducerPath]: submissionApi.reducer,
  [s3Api.reducerPath]: s3Api.reducer,
  [feederApi.reducerPath]: feederApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  auth: authReducer,
  drawer: drawerReducer,
  progress: dataSubmissionReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      identityApi.middleware,
      s3Api.middleware,
      dictionariesApi.middleware,
      drugsApi.middleware,
      genesApi.middleware,
      submissionApi.middleware,
      overviewApi.middleware,
      feederApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
