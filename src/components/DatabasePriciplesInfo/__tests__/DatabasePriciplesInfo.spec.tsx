import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import DatabasePrinciplesInfo from '../DatabasePrinciplesInfo';

describe('DatabasePrinciplesInfo component test', () => {
  test('renders DatabasePrinciplesInfo component without error', () => {
    render(
      <DatabasePrinciplesInfo />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DatabasePrinciplesInfo />,
    );

    expect(tree).toMatchSnapshot();
  });
});
