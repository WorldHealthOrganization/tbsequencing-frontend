import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../../../utils/testUtils/jestUtils';
import Contact from '../Contact';

describe('Contact component test', () => {
  test('renders Contact component without error', () => {
    render(
      <Contact />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <Contact />,
    );

    expect(tree).toMatchSnapshot();
  });
});
