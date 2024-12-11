import { IFile, ResistanceSampleType } from '../../../../services/submissionApi/models';
import { getFileByType } from '../getFileByType';

const createMockFile = (type: ResistanceSampleType) => ({
  url: 'mock',
  filename: 'mock',
  testCount: 1,
  uploadedOn: new Date().toString(),
  pk: 0,
  file: 'mock',
  type,
});

describe('getFileByType tests', () => {
  const mockFiles: IFile[] = [createMockFile('PDST'), createMockFile('MIC')];

  it('Should return file with a proper type', () => {
    const file = getFileByType('PDST', mockFiles);

    expect(file).toBeDefined();
    expect(file?.type).toBe('PDST');
  });

  it('Should return undefined if there is no file in files', () => {
    const mockFilesNoNeeded: IFile[] = [createMockFile('MIC')];
    const file = getFileByType('PDST', mockFilesNoNeeded);

    expect(file).toBeUndefined();
  });

  it('Should return undefined if there is no files at all', () => {
    const mockFilesEmpty: IFile[] = [];
    const file = getFileByType('MIC', mockFilesEmpty);

    expect(file).toBeUndefined();
  });
});
