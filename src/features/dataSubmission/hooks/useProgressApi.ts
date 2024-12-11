import { useAppSelector } from '../../../app/hooks';
import {
  uploadProgressSelector, IUploadProgress,
} from '../dataSubmissionSlice';

interface ProgressApi {
  progress: IUploadProgress[];
}

export const useProgressApi = (): ProgressApi => {
  const progress = useAppSelector(uploadProgressSelector);

  return {
    progress,
  };
};
