import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import UserInfo from '../UserInfo';

describe('UserInfo component test', () => {
  test('renders UserInfo component without error', () => {
    render(
      <UserInfo />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <UserInfo />,
    );

    expect(tree).toMatchSnapshot();
  });
});
