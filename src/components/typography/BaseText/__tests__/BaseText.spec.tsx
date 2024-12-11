import React from 'react';
import { css } from '@emotion/react';
import { getTreeJSONWithRedux, render, screen } from '../../../../utils/testUtils/jestUtils';
import BaseText from '../BaseText';

describe('BaseText component test', () => {
  const mockText = 'mockText';
  const mockStyles = css({});

  test('renders BaseText component', () => {
    render(
      <BaseText style={mockStyles}>{mockText}</BaseText>,
    );

    const foundElement = screen.queryByText(mockText);

    expect(foundElement).toBeTruthy();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <BaseText style={mockStyles}>{mockText}</BaseText>,
    );

    expect(tree).toMatchSnapshot();
  });
});
