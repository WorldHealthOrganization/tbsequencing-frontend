import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../../../utils/testUtils/jestUtils';
import ChangePasswordModal from '../ChangePasswordModal';

describe('ChangePasswordModal component test', () => {
  test('renders ChangePasswordModal component without error', () => {
    render(
      <ChangePasswordModal />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ChangePasswordModal />,
    );

    expect(tree).toMatchSnapshot();
  });
});
