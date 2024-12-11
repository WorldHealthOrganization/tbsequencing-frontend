import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import MapLegendSquare from '../MapLegendSquare';

describe('MapLegendSquare component test', () => {
  test('renders MapLegendSquare component without error', () => {
    render(
      <MapLegendSquare />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <MapLegendSquare />,
    );

    expect(tree).toMatchSnapshot();
  });
});
