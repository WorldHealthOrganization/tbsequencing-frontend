import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../utils/testUtils/jestUtils';
import AuthButton from '../AuthButton';

describe('AuthButton component test', () => {
  const mockOnClick = jest.fn();
  const mockActive = true;
  const mockLabel = 'mock';

  test('renders AuthButton component without error', () => {
    render(
      <AuthButton label={mockLabel} onClick={mockOnClick} isActive={mockActive} />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AuthButton label={mockLabel} onClick={mockOnClick} isActive={mockActive} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
