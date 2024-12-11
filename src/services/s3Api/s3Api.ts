import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';
import { getEndpoint } from '../../utils/getEndpoint';
import { IUploadFileToS3Request } from './models';
import { setUploadProgress } from '../../features/dataSubmission/dataSubmissionSlice';

const baseUrl = getEndpoint();

export const s3Api = createApi({
  reducerPath: 's3Api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    uploadFileToS3: build.mutation<void, IUploadFileToS3Request>(
      {
        queryFn: async (requestProps, api) => {
          try {
            const result = await axios.put(`${requestProps.url}`, requestProps.file, {
              onUploadProgress: (upload) => {
                if (upload.total) {
                  const uploadProgress = Math.round((100 * upload.loaded) / upload.total);
                  api.dispatch(setUploadProgress({
                    fileName: requestProps.file.name,
                    progressCount: uploadProgress,
                    uploadedSizeCount: upload.loaded,
                  }));
                }
              },
            });
            return { data: result.data };
          } catch (axiosError) {
            const err = axiosError;
            return {
              error: {
                // @ts-ignore
                status: err.response?.status,
                // @ts-ignore
                data: err.response?.data || err.message,
              },
            };
          }
        },
      },
    ),
  }),
});

export const { useUploadFileToS3Mutation } = s3Api;
