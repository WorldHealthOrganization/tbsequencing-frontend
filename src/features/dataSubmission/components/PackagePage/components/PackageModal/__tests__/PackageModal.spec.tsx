import React from 'react';
import { render, screen } from '../../../../../../../utils/testUtils/jestUtils';
import PackageModal from '../PackageModal';

describe('PackageModal component test', () => {
  const mockOkayLabel = 'Okay';
  const mockCancelLabel = 'Cancel';
  const mockInitialName = 'Mock';
  const mockCancelHandler = jest.fn();
  const mockOnSubmitHandler = jest.fn();
  const mockTitle = 'title';

  test('renders PackageModal component without error', () => {
    render(
      <PackageModal
        okayLabel={mockOkayLabel}
        cancelLabel={mockCancelLabel}
        onCancelClick={mockCancelHandler}
        initialName={mockInitialName}
        onSubmit={mockOnSubmitHandler}
        open
        title={mockTitle}
        isLoading={false}
      />,
    );
  });

  it('Should render title in opened state', () => {
    render(
      <PackageModal
        okayLabel={mockOkayLabel}
        cancelLabel={mockCancelLabel}
        onCancelClick={mockCancelHandler}
        initialName={mockInitialName}
        onSubmit={mockOnSubmitHandler}
        open
        title={mockTitle}
        isLoading={false}
      />,
    );

    screen.getByText(mockTitle);
  });

  it('Should render okay and cancel buttons in opened state', () => {
    render(
      <PackageModal
        okayLabel={mockOkayLabel}
        cancelLabel={mockCancelLabel}
        onCancelClick={mockCancelHandler}
        initialName={mockInitialName}
        onSubmit={mockOnSubmitHandler}
        open
        title={mockTitle}
        isLoading={false}
      />,
    );

    screen.getByText(mockOkayLabel);
    screen.getByText(mockCancelLabel);
  });

  it('Should not render okay and cancel buttons in closed state', () => {
    render(
      <PackageModal
        okayLabel={mockOkayLabel}
        cancelLabel={mockCancelLabel}
        onCancelClick={mockCancelHandler}
        initialName={mockInitialName}
        onSubmit={mockOnSubmitHandler}
        open={false}
        title={mockTitle}
        isLoading={false}
      />,
    );

    const okayBtn = screen.queryByText(mockOkayLabel);
    const cancelBtn = screen.queryByText(mockCancelLabel);

    expect(okayBtn).toBeNull();
    expect(cancelBtn).toBeNull();
  });
});
