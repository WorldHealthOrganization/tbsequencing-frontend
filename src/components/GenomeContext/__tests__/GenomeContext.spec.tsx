import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import GenomeContext from '../GenomeContext';
import {
  dataSet1,
  dataSet2,
  dataSet3,
  dataSet4,
  dataSet5,
  result1,
  result2,
  result3,
  result4,
  result5,
  mockData, mockGene,
} from '../testMock';
import { formatGenomeContextData } from '../utils';

describe('GenomeContext component test', () => {
  test('renders GenomeContext component without error', () => {
    render(
      <GenomeContext
        isLoading={false}
        data={mockData}
        selectedGene={mockGene}
        maxDomain={760000}
        minDomain={763112}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <GenomeContext
        isLoading={false}
        data={mockData}
        selectedGene={mockGene}
        maxDomain={760000}
        minDomain={763112}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('GenomeContext layout', () => {
  test.each([
    [dataSet1, result1],
    [dataSet2, result2],
    [dataSet3, result3],
    [dataSet4, result4],
    [dataSet5, result5],
  ])('successfully format data to render rows', (data, expected) => {
    const result = formatGenomeContextData(data);

    expect(result).toEqual(expected);
  });
});
