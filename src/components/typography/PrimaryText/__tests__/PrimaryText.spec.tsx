import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../utils/testUtils/jestUtils';
import PrimaryText from '../PrimaryText';

describe('PrimaryText component test', () => {
  const mockText = 'mockText';

  test('renders PrimaryText component with a proper text', () => {
    render(
      <PrimaryText>{mockText}</PrimaryText>,
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
