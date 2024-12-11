import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../utils/testUtils/jestUtils';
import H2 from '../H2';

describe('H2 component test', () => {
  const mockText = 'mockText';

  test('renders H2 component with a proper text', () => {
    render(
      <H2>{mockText}</H2>,
    );

    const foundElement = screen.queryByText(mockText);

    expect(foundElement).toBeTruthy();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <H2>{mockText}</H2>,
    );

    expect(tree).toMatchSnapshot();
  });
});
