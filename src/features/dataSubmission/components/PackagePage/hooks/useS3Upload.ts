import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUploadFileToS3Mutation } from '../../../../../services/s3Api/s3Api';
import { useFetchFileFromS3Mutation } from '../../../../../services/submissionApi/submissionApi';

export const useS3Upload = () => {
  const [uploadFileToS3,
    { error: uploadFileToS3Error, isLoading: isUploadFileToS3Loading },
  ] = useUploadFileToS3Mutation();
  const [fetchFileFromS3, {
    data: fetchFileFromS3Data,
    error: fetchFileFromS3Error,
    isLoading: isFetchFileFromS3DataLoading,
    originalArgs,
  }] = useFetchFileFromS3Mutation();

  useEffect(() => {
    // amazon s3 error

    if (uploadFileToS3Error) {
      toast.error('There was an error while uploading file to s3, please try again');
    }
  }, [uploadFileToS3Error]);

  return {
    uploadFileToS3,
    fetchFileFromS3,
    fetchFileFromS3Data,
    fetchFileFromS3Error,
    isUploadFileToS3Loading,
    isFetchFileFromS3DataLoading,
    fetchFileFromS3OriginalArgs: originalArgs,
  };
};
