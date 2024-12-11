import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import getFetchWithAuth from '../../app/fetchWithAuth';
import { prepareHeaders } from '../indentityApi/utils/prepareHeaders';
import { getEndpoint } from '../../utils/getEndpoint';
import type {
  GetPackagesResponse,
  ICreatePackageRequest,
  IDataUploadResponse,
  IGetPackageWithSamplesResponse,
  IPackage,
  IDataSample,
  IGetSequencingFileLinkRequest,
  ISequencingFile,
  IMatchPackageResponse,
  ISetContributorsRequest, ISubmitPackageRequest, IUpdateSampleRequest,
} from './models';
import {
  IFetchFileFromS3Request,
  IGetPackageWithSamplesRequest,
  IGetSequencingFileLinkResponse, IMatchPackageRequest, IRemoveSequencingFileFromPackageRequest,
  IUpdatePackageRequest, RemoveMICPDSTests,
  IMessage,
} from './models';
import {
  getResistanceSamplesByType,
} from '../../features/dataSubmission/components/PackagePage/components/ResistanceData/utils/dataUtils';

const baseUrl = getEndpoint();

const CREATE_PACKAGE_TAG = 'createPackage';
const UPDATE_RESISTANCE_FILE_TAG = 'resistanceFileUpdate';
const UPDATE_SEQUENCE_FILE_TAG = 'sequencingFileRemove';
const UPDATE_PACKAGE_TAG = 'updatePackage';
const SUBMIT_PACKAGE_TAG = 'submitPackage';

const fetcher = getFetchWithAuth({
  baseUrl,
  prepareHeaders,
});

export const submissionApi = createApi({
  reducerPath: 'submissionApi',
  baseQuery: fetcher,
  tagTypes: [
    CREATE_PACKAGE_TAG,
    UPDATE_RESISTANCE_FILE_TAG,
    UPDATE_SEQUENCE_FILE_TAG,
    UPDATE_PACKAGE_TAG,
    SUBMIT_PACKAGE_TAG,
  ],
  endpoints: (build) => ({
    createPackage: build.mutation<void, ICreatePackageRequest>({
      query: (body) => ({
        url: '/submission/packages/',
        method: 'POST',
        body,
      }),
      invalidatesTags: [CREATE_PACKAGE_TAG],
    }),
    getPackages: build.query<GetPackagesResponse, void>({
      query: () => ({
        url: '/submission/packages/',
      }),
      providesTags: [CREATE_PACKAGE_TAG, SUBMIT_PACKAGE_TAG],
    }),
    getPackageById: build.query<IPackage, number>({
      query: (id) => ({
        url: `/submission/packages/${id}`,
      }),
      providesTags: [UPDATE_RESISTANCE_FILE_TAG, UPDATE_PACKAGE_TAG],
    }),
    getSamples: build.query<void, string>({
      query: (url) => ({
        url,
      }),
    }),
    removeFileFromPackage: build.mutation<void, RemoveMICPDSTests>({
      query: ({ packageId, type }) => ({
        url: `/submission/packages/${packageId}/${type}-tests/clear/`,
        method: 'POST',
      }),
      invalidatesTags: [UPDATE_RESISTANCE_FILE_TAG],
    }),
    updatePackage: build.mutation<void, IUpdatePackageRequest>({
      query: (body) => ({
        url: `/submission/packages/${body.packageId}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [UPDATE_PACKAGE_TAG],
    }),
    updateSample: build.mutation<void, IUpdateSampleRequest>({
      query: ({ packageId, sampleId, name }) => ({
        url: `/submission/packages/${packageId}/sample-aliases/${sampleId}/`,
        method: 'PATCH',
        body: {
          name,
        },
      }),
      async onQueryStarted({ packageId, sampleId, name }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            submissionApi.util.updateQueryData('getPackageWithSamples', { packageId }, (draft) => {
              const { micSamples, pdsSamples } = draft;
              const updatedMicSamples = micSamples.map(
                (micSample) => (sampleId === micSample.pk ? { ...micSample, name } : micSample),
              );

              const updatedPdsSamples = pdsSamples.map(
                (pdsSample) => (pdsSample.pk === sampleId ? { ...pdsSample, name } : pdsSample),
              );

              const resultData = {
                matchingState: 'CHANGED',
                micSamples: updatedMicSamples,
                pdsSamples: updatedPdsSamples,
              };

              Object.assign(draft, resultData);
            }),

          );
        } catch (e) {
          console.log(e);
          // we don't need any action here, since we are handling errors inside component
        }
      },
    }),
    getPackageWithSamples: build.query<
    IGetPackageWithSamplesResponse,
    IGetPackageWithSamplesRequest
    >({
      async queryFn(
        _arg,
        _queryApi,
        _extraOptions,
      ) {
        const packageResult = await fetcher(`/submission/packages/${_arg.packageId}`, _queryApi, _extraOptions);

        if (packageResult.error) {
          return { error: packageResult.error as FetchBaseQueryError };
        }

        const packageData = packageResult.data as IPackage;
        const samplesResponse = await fetcher(`/submission/packages/${_arg.packageId}/sample-aliases`, _queryApi, _extraOptions);

        if (samplesResponse.error) {
          return { error: samplesResponse.error as FetchBaseQueryError };
        }

        const samplesData = samplesResponse.data as IDataSample[];
        const micSamples = getResistanceSamplesByType(samplesData, 'MIC');
        const pdsSamples = getResistanceSamplesByType(samplesData, 'PDST');

        return {
          data: {
            ...packageData,
            samples: samplesData,
            micSamples,
            pdsSamples,
          },
        };
      },
      providesTags: [UPDATE_RESISTANCE_FILE_TAG, UPDATE_PACKAGE_TAG, UPDATE_SEQUENCE_FILE_TAG],
    }),
    getSequencingFileLink: build.mutation<
    IGetSequencingFileLinkResponse, IGetSequencingFileLinkRequest
    >({
      query: (requestData) => ({
        url: `/submission/packages/${requestData.packageId}/sequencing-data/upload-link/`,
        method: 'POST',
        body: requestData,
      }),
    }),

    getAllSequencingFiles: build.query<ISequencingFile[], number>({
      query: (packageId) => ({
        url: `/submission/packages/${packageId}/sequencing-data/`,
      }),
      providesTags: [UPDATE_SEQUENCE_FILE_TAG],
    }),

    uploadFile: build.mutation<IDataUploadResponse, FormData>({
      query: (formData) => {
        const pk = formData.get('pk');
        const fileType = formData.get('type');

        return ({
          url: `/submission/packages/${pk}/${fileType}/`,
          method: 'POST',
          body: formData,
        });
      },
      invalidatesTags: [UPDATE_RESISTANCE_FILE_TAG],
    }),
    removeSequenceFileFromPackage: build.mutation<void, IRemoveSequencingFileFromPackageRequest>({
      query: ({ fileId, packageId }) => ({
        url: `/submission/packages/${packageId}/sequencing-data/${fileId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [UPDATE_SEQUENCE_FILE_TAG],
    }),
    fetchFileFromS3: build.mutation<void, IFetchFileFromS3Request>({
      query: ({ filename, packageId }) => ({
        url: `/submission/packages/${packageId}/sequencing-data/fetch/`,
        body: {
          filename,
        },
        method: 'POST',
      }),
      invalidatesTags: [UPDATE_SEQUENCE_FILE_TAG],
    }),
    setContributorsToPackage: build.mutation<void, ISetContributorsRequest>(
      {
        query: ({ packageId, contributors }) => ({
          url: `/submission/packages/${packageId}/contributors/`,
          body: {
            contributors,
          },
          method: 'POST',
        }),
      },
    ),
    submitPackage: build.mutation<void, ISubmitPackageRequest>({
      query: ({ packageId }) => ({
        url: `/submission/packages/${packageId}/submit/`,
        method: 'POST',
      }),
      invalidatesTags: [SUBMIT_PACKAGE_TAG],
    }),
    matchPackage: build.mutation<IMatchPackageResponse, IMatchPackageRequest>({
      query: ({ packageName, packageId }) => ({
        url: `/submission/packages/${packageId}/match/`,
        method: 'POST',
        body: {
          name: packageName,
        },
      }),
      invalidatesTags: [UPDATE_PACKAGE_TAG, UPDATE_SEQUENCE_FILE_TAG],
    }),
    sendMessages: build.mutation<void, IMessage>({
      query: (body) => ({
        url: `/submission/packages/${body.pk}/messages/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [CREATE_PACKAGE_TAG],
    }),
    getMessages: build.query<IMessage[], number>({
      query: (packageID) => ({
        url: `/submission/packages/${packageID}/messages/`,
      }),
      transformResponse(messages: IMessage[]) {
        return messages.sort(
          (prev, next) => Date.parse(prev.timestamp) - Date.parse(next.timestamp),
        );
      },
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetPackagesQuery,
  useUploadFileMutation,
  useGetSamplesQuery,
  useMatchPackageMutation,
  useRemoveFileFromPackageMutation,
  useUpdatePackageMutation,
  useGetPackageWithSamplesQuery,
  useGetSequencingFileLinkMutation,
  useFetchFileFromS3Mutation,
  useGetAllSequencingFilesQuery,
  useRemoveSequenceFileFromPackageMutation,
  useSetContributorsToPackageMutation,
  useSubmitPackageMutation,
  useGetMessagesQuery,
  useSendMessagesMutation,
  useUpdateSampleMutation,
  useGetPackageByIdQuery,
} = submissionApi;
