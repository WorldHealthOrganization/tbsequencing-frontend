import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import ThrowTestError from '../ThrowTestError';

describe('ThrowTestError component test', () => {
  test('renders ThrowTestError component without error', () => {
    render(
      <ThrowTestError />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ThrowTestError />,
    );

    expect(tree).toMatchSnapshot();
  });
});
