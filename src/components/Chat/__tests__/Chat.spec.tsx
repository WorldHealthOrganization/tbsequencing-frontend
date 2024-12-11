import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import Chat from '../Chat';

describe('chat', () => {
  test('renders Chat component', () => {
    render(<Chat />);
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <Chat />,
    );

    expect(tree).toMatchSnapshot();
  });
});
