import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../utils/testUtils/jestUtils';
import SecondaryText from '../SecondaryText';
import PrimaryText from '../../PrimaryText';

describe('SecondaryText component test', () => {
  const mockText = 'mockText';

  test('renders SecondaryText component with a proper text', () => {
    render(
      <SecondaryText>{mockText}</SecondaryText>,
    );

    const foundElement = screen.queryByText(mockText);

    expect(foundElement).toBeTruthy();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <PrimaryText>{mockText}</PrimaryText>,
    );

    expect(tree).toMatchSnapshot();
  });
});
