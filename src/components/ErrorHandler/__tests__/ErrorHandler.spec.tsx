import React from 'react';
import { render, getTreeJSONWithRedux, wrappedInRouter } from '../../../utils/testUtils/jestUtils';
import ErrorHandler from '../ErrorHandler';

describe('ErrorHandler component test', () => {
  test('renders ErrorHandler component without error', () => {
    render(
      wrappedInRouter(<ErrorHandler />),
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedInRouter(<ErrorHandler />),
    );

    expect(tree).toMatchSnapshot();
  });
});
