import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../utils/testUtils/jestUtils';
import RegionCharts from '../RegionCharts';
import { IAggregatedGlobalDrug } from '../../../../../services/drugsApi/models';
import { Regions } from '../../../../drugsView/models';

describe('RegionCharts component test', () => {
  const mockData: IAggregatedGlobalDrug[] = [
    {
      regionId: Regions.EASTERN_MEDITERRANEAN,
      aggregatedIntermediate:
        10,
      aggregatedIntermediateRatioFormatted: 'mock',
      aggregatedResistant:
        10,
      aggregatedResistantRatioFormatted: 'mock',
      aggregatedResistantRatio: 10,
      aggregatedSusceptibleRatioFormatted: 'mock',
      aggregatedSusceptibleRatio: 10,
      aggregatedSusceptible: 10,
      aggregatedIntermediateRatio: 10,
      aggregatedTotal: 1000,
      regionName: 'mockName',
    },
  ];

  const mockConfigPosition = {
    top: 0,
    left: 0,
  };

  const mockConfig = {
    [Regions.EASTERN_MEDITERRANEAN]: mockConfigPosition,
  };

  const mockHandler = (_: IAggregatedGlobalDrug) => jest.fn();

  test('renders RegionCharts component without error', () => {
    render(
      <RegionCharts
        // @ts-ignore
        rectConfig={mockConfig}
        aggregatedData={mockData}
        getOnRegionClickHandler={mockHandler}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <RegionCharts
        // @ts-ignore
        rectConfig={mockConfig}
        aggregatedData={mockData}
        getOnRegionClickHandler={mockHandler}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
