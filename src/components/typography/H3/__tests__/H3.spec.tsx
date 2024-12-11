import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../utils/testUtils/jestUtils';
import H3 from '../H3';

describe('H3 component test', () => {
  const mockText = 'mockText';

  test('renders H3 component with a proper text', () => {
    render(
      <H3>{mockText}</H3>,
    );

    const foundElement = screen.queryByText(mockText);

    expect(foundElement).toBeTruthy();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <H3>{mockText}</H3>,
    );

    expect(tree).toMatchSnapshot();
  });
});
