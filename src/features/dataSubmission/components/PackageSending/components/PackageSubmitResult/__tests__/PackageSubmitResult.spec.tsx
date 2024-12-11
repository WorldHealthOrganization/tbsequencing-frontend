import React from 'react';
import { render } from '../../../../../../../utils/testUtils/jestUtils';
import PackageSubmitResult from '../PackageSubmitResult';

describe('PackageSubmitResult component test', () => {
  const mockOnClose = jest.fn();

  test('renders PackageSubmitResult component without error', () => {
    render(
      <PackageSubmitResult onClose={mockOnClose} open />,
    );
  });
});
