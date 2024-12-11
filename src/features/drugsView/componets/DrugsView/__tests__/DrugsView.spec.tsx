import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, wrappedInRouter,
} from '../../../../../utils/testUtils/jestUtils';
import DrugsView from '../DrugsView';

describe('DrugsView', () => {
  test('renders DrugsView components without error', () => {
    render(
      wrappedInRouter(<DrugsView />),
    );
  });

  test('renders DrugsView title without error', () => {
    render(
      wrappedInRouter(<DrugsView />),
    );

    screen.getByText('Resistance overview per drug');
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(<DrugsView />),
    );

    expect(tree).toMatchSnapshot();
  });
});
