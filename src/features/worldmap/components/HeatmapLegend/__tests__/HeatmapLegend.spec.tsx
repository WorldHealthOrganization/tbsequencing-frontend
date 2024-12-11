import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import HeatmapLegend from '../HeatmapLegend';

describe('HeatmapLegend component test', () => {
  test('renders HeatmapLegend component without error', () => {
    render(
      <HeatmapLegend />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <HeatmapLegend />,
    );

    expect(tree).toMatchSnapshot();
  });
});
