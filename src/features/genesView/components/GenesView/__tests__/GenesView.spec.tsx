import React from 'react';
import { getTreeJSONWithRedux, render, wrappedInRouter } from '../../../../../utils/testUtils/jestUtils';
import GenesView from '../index';

describe('GenesView', () => {
  test('renders GenesView component without error', () => {
    render(
      wrappedInRouter(<GenesView />),
    );
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(<GenesView />),
    );

    expect(tree).toMatchSnapshot();
  });
});
