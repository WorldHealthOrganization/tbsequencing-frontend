import React from 'react';
import { render, wrappedInRouter, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import { Registration } from '../Registration';

describe('Registration component test', () => {
  const wrappedWithRouter = wrappedInRouter(<Registration />);
  test('renders Registration component without error', () => {
    render(
      wrappedWithRouter,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      wrappedWithRouter,
    );

    expect(tree).toMatchSnapshot();
  });
});
