import React from 'react';
import {
  render, screen, getTreeJSONWithRedux, wrappedInRouter,
} from '../../../../../utils/testUtils/jestUtils';
import PackageSending from '../PackageSending';

describe('PackageSending component test', () => {
  test('renders PackageSending component without error', () => {
    render(
      wrappedInRouter(
        <PackageSending />,
      ),
    );
  });

  it('Should not render formFields onInitial state', () => {
    render(
      wrappedInRouter(
        <PackageSending />,
      ),
    );

    const foundElements = screen.queryAllByText('Name *');
    expect(foundElements.length).toBe(0);
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(
        <PackageSending />,
      ),
    );

    expect(tree).toMatchSnapshot();
  });
});
