import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../utils/testUtils/jestUtils';
import AccountDetails from '../AccountDetails';

describe('AccountDetails component test', () => {
  test('renders AccountDetails component without error', () => {
    render(
      <AccountDetails />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AccountDetails />,
    );

    expect(tree).toMatchSnapshot();
  });
});
