import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { ICreateFeedbackRequest } from './models';

const projectId = process.env.REACT_APP_FEEDER_PROJECT_ID;

const baseUrl = 'https://feeder-node-1337.herokuapp.com';

export const feederApi = createApi({
  reducerPath: 'feederApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    createFeedback: build.mutation<void, ICreateFeedbackRequest>({
      query: (params) => ({
        url: '/feedback/create',
        body: {
          ...params,
          projectId,
        },
        method: 'POST',
      }),
    }),

  }),
});

export const { useCreateFeedbackMutation } = feederApi;
