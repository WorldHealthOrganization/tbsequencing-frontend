import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import UserMenu from '../UserMenu';

describe('UserMenu component test', () => {
  const wrappedInRouter = <BrowserRouter><UserMenu /></BrowserRouter>;

  test('renders UserMenu component without error', () => {
    render(
      wrappedInRouter,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter,
    );

    expect(tree).toMatchSnapshot();
  });
});
