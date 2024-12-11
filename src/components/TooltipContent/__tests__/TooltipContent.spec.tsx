import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import TooltipContent from '../TooltipContent';

describe('TooltipContent component test', () => {
  test('renders TooltipContent component without error', () => {
    render(
      <TooltipContent
        susceptibleQuantity={0}
        susceptibleRatio=""
        shouldRenderColorLegend={false}
        resistantQuantity={0}
        resistantRatio=""
        intermediateQuantity={0}
        intermediateRatio=""
        totalSamples={0}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <TooltipContent
        susceptibleQuantity={0}
        susceptibleRatio=""
        shouldRenderColorLegend={false}
        resistantQuantity={0}
        resistantRatio=""
        intermediateQuantity={0}
        intermediateRatio=""
        totalSamples={0}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
