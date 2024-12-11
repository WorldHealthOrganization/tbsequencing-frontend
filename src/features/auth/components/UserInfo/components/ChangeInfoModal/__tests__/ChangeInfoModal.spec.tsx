import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../utils/testUtils/jestUtils';
import ChangeInfoModal from '../ChangeInfoModal';

describe('ChangeInfoModal component test', () => {
  test('renders ChangeInfoModal component without error', () => {
    render(
      <ChangeInfoModal />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ChangeInfoModal />,
    );

    expect(tree).toMatchSnapshot();
  });
});
