import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, wrappedInRouter,
} from '../../../../../utils/testUtils/jestUtils';
import MutationView from '../MutationView';

describe('MutationView', () => {
  test('renders MutationView components without error', () => {
    render(
      wrappedInRouter(<MutationView />),
    );
  });

  test('renders MutationView title without error', () => {
    render(
      wrappedInRouter(<MutationView />),
    );

    screen.getByText('Mutations Search');
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(<MutationView />),
    );

    expect(tree).toMatchSnapshot();
  });
});
