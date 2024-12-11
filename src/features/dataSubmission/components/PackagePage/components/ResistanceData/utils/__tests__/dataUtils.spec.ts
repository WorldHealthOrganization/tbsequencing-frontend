import { IDataSample } from '../../../../../../../../services/submissionApi/models';
import { getResistanceSamplesDataByValidity } from '../dataUtils';

describe('getResistanceSamplesDataByValidity tests', () => {
  const mockSamples: IDataSample[] = [{
    description: 'mock',
    sampleName: 'mock',
    isValid: true,
    type: 'PDST',
  }, {
    description: 'mock',
    sampleName: 'mock',
    isValid: false,
    type: 'PDST',
  }, {
    description: 'mock',
    sampleName: 'mock',
    isValid: true,
    type: 'MIC',
  }];

  it('Should not contain invalid samples in case of valid filter', () => {
    const samples = getResistanceSamplesDataByValidity(mockSamples, false);

    samples.forEach((sample) => {
      expect(sample.isValid).toBeFalsy();
    });
  });

  it('Should return empty array if there is nothing to find', () => {
    const mockSamplesValid: IDataSample[] = [{
      description: 'mock',
      sampleName: 'mock',
      isValid: true,
      type: 'MIC',
    }];

    const result = getResistanceSamplesDataByValidity(mockSamplesValid, false);

    expect(result.length).toBe(0);
  });

  it('Should not produce error in case of empty array, should return []', () => {
    const mockSamplesEmpty: IDataSample[] = [];
    const result = getResistanceSamplesDataByValidity(mockSamplesEmpty, false);

    expect(result.length).toBe(0);
  });
});
