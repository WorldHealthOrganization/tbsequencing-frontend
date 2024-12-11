import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import Partner from '../Partner';

describe('Partner component test', () => {
  test('renders Partner component without error', () => {
    render(
      <Partner />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <Partner />,
    );

    expect(tree).toMatchSnapshot();
  });
});
