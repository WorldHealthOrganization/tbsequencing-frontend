import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import AppButton from '../AppButton';

describe('AppButton component test', () => {
  const mockOnClick = jest.fn();

  test('renders AppButton component without error', () => {
    render(
      <AppButton onClick={mockOnClick} variant="outlined" size="small">mock</AppButton>,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AppButton onClick={mockOnClick} variant="outlined" size="small">mock</AppButton>,
    );

    expect(tree).toMatchSnapshot();
  });
});
