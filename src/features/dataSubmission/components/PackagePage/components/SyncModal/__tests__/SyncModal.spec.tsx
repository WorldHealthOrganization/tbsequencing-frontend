import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../../../utils/testUtils/jestUtils';
import SyncModal from '../SyncModal';

describe('SyncModal component test', () => {
  test('renders SyncModal component without error', () => {
    render(
      <SyncModal />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <SyncModal />,
    );

    expect(tree).toMatchSnapshot();
  });
});
