import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface IUploadProgress {
  fileName: string;
  progressCount: number;
  uploadedSizeCount: number;
}
export interface IDataSubmissionInitialState {
  uploadProgress: IUploadProgress[];
}

const initialState: IDataSubmissionInitialState = {
  uploadProgress: [],
};

export const dataSubmissionSlice = createSlice({
  name: 'dataSubmission',
  initialState,
  reducers: {
    setUploadProgress(state, action) {
      const alreadyExist = state.uploadProgress.find(
        (file) => file.fileName === action.payload.fileName,
      );
      if (!alreadyExist) {
        state.uploadProgress = [...state.uploadProgress, action.payload];
      } else {
        state.uploadProgress = state.uploadProgress.map((item) => {
          if (item.fileName === action.payload.fileName) {
            return {
              ...item,
              uploadedSizeCount: action.payload.uploadedSizeCount,
              progressCount: action.payload.progressCount,
            };
          }
          return item;
        });
      }
    },
  },
});

export const uploadProgressSelector = (state: RootState) => state.progress.uploadProgress;

export default dataSubmissionSlice.reducer;

export const { setUploadProgress } = dataSubmissionSlice.actions;
