import { IFile, ResistanceSampleType } from '../../../services/submissionApi/models';

export const getFileByType = (fileType: ResistanceSampleType, files: IFile[]):
IFile | undefined => files.find((file) => file.type === fileType);
