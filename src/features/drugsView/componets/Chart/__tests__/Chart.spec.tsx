import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import Chart from '../Chart';
import { ChartDataType } from '../../../models';

describe('Chart', () => {
  const props = {
    onClick: jest.fn(),
    data: [],
    dataType: ChartDataType.Ratio,
    selectedDrug: {
      drugName: 'Rifampicin',
      code: 'RIF',
      drugId: 1,
    },
    isLoading: false,
  };
  test('renders Chart components without error', () => {
    render(
      <Chart {...props} />,
    );
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <Chart {...props} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
