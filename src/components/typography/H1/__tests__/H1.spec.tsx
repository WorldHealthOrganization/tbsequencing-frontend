import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../utils/testUtils/jestUtils';
import H1 from '../H1';

describe('H1 component test', () => {
  const mockText = 'mockText';

  test('renders H1 component with given text without error', () => {
    render(
      <H1>{mockText}</H1>,
    );

    const foundElement = screen.queryByText(mockText);

    expect(foundElement).toBeTruthy();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <H1>{mockText}</H1>,
    );

    expect(tree).toMatchSnapshot();
  });
});
