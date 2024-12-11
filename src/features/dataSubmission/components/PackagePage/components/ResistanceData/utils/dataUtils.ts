import { IDataSample, ResistanceSampleType } from '../../../../../../../services/submissionApi/models';

export const getResistanceSamplesDataByValidity = (
  samplesData: IDataSample[],
  isValid: boolean,
) => samplesData.filter((
  sample,
) => {
  if (isValid) {
    return sample.matchSource !== 'NO_MATCH' && sample.matchSource !== null;
  }

  return sample.matchSource === 'NO_MATCH';
});

export const getResistanceSamplesByType = (
  samplesData: IDataSample[],
  resistanceSampleType: ResistanceSampleType,
) => {
  const fieldName = resistanceSampleType === 'MIC' ? 'micTestsCount' : 'pdsTestsCount';

  return samplesData.filter((sample) => sample[fieldName] > 0);
};

export const getUnprocessedResistanceSamples = (
  samplesData: IDataSample[],
) => samplesData.filter((sample) => sample.matchSource === null);
