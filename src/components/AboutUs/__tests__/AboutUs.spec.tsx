import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import AboutUs from '../AboutUs';

describe('AboutUs component test', () => {
  test('renders AboutUs component without error', () => {
    render(
      <AboutUs />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AboutUs />,
    );

    expect(tree).toMatchSnapshot();
  });
});
