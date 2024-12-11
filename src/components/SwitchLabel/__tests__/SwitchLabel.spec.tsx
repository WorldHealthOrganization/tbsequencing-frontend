import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import SwitchLabel from '../SwitchLabel';

describe('SwitchLabel component test', () => {
  test('renders SwitchLabel component without error', () => {
    render(
      <SwitchLabel />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <SwitchLabel />,
    );

    expect(tree).toMatchSnapshot();
  });
});
