import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import OverflowMuiTooltip from '../OverflowMuiTooltip';

describe('OverflowMuiTooltip component test', () => {
  const mockProps = { text: 'mock', tooltip: 'mock' };

  test('renders OverflowMuiTooltip component without error', () => {
    render(
      <OverflowMuiTooltip {...mockProps} />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <OverflowMuiTooltip {...mockProps} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
