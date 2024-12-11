import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../utils/testUtils/jestUtils';
import TextButton from '../TextButton';

describe('TextButton component test', () => {
  const mockOnClick = jest.fn();
  const mockLabel = 'mockLabel';

  test('renders TextButton component without error', () => {
    render(
      <TextButton onClick={mockOnClick}>{mockLabel}</TextButton>,
    );
  });

  it('Should render label properly', () => {
    render(
      <TextButton onClick={mockOnClick}>{mockLabel}</TextButton>,
    );

    screen.getByText(mockLabel);
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <TextButton onClick={mockOnClick}>{mockLabel}</TextButton>,
    );

    expect(tree).toMatchSnapshot();
  });
});
