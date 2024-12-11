import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import RoundButton from '../RoundButton';

describe('RoundButton component test', () => {
  const mockOnClick = jest.fn();

  test('renders RoundButton component without error', () => {
    render(
      <RoundButton onClick={mockOnClick} size="small" variant="add" />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <RoundButton onClick={mockOnClick} size="small" variant="add" />,
    );

    expect(tree).toMatchSnapshot();
  });
});
