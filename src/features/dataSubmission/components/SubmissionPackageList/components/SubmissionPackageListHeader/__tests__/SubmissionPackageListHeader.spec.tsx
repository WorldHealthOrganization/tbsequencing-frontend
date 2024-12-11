import React from 'react';
import { render, screen } from '../../../../../../../utils/testUtils/jestUtils';
import SubmissionPackageListHeader from '../SubmissionPackageListHeader';

describe('SubmissionPackageListHeader component test', () => {
  const mockOnCreateClick = jest.fn();

  test('renders SubmissionPackageListHeader component without error', () => {
    render(
      <SubmissionPackageListHeader
        onCreateClick={mockOnCreateClick}
      />,
    );
  });

  it('Should render proper buttons and call proper callbacks', () => {
    render(
      <SubmissionPackageListHeader
        onCreateClick={mockOnCreateClick}
      />,
    );

    const instructionBtn = screen.queryByText('Instructions');
    const createBtn = screen.queryByText('Create submission package');

    instructionBtn?.click();
    createBtn?.click();

    expect(mockOnCreateClick).toBeCalled();
  });

  it('Should render header properly', () => {
    render(
      <SubmissionPackageListHeader
        onCreateClick={mockOnCreateClick}
      />,
    );

    screen.getAllByText('Create submission package');
  });
});
