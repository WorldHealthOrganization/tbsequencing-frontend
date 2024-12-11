import React from 'react';
import { screen } from '@testing-library/react';
import { getTreeJSONWithRedux, render } from '../../../../../../../utils/testUtils/jestUtils';
import DataSubmissionSampleRow from '../DataSubmissionSampleRow';

describe('DataSubmissionSampleRow component test', () => {
  const title = 'mockTitle';
  const mockDescription = 'mockDescription';
  const mockOnRemoveClick = jest.fn();
  const mockControlsDisabled = false;

  test('renders DataSubmissionSampleRow component without error', () => {
    render(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        controlDisabled={mockControlsDisabled}
      />,
    );
  });

  it('Should render title properly', () => {
    render(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        controlDisabled={mockControlsDisabled}
      />,
    );

    screen.getByText(title);
  });

  it('Should render description properly', () => {
    render(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        controlDisabled={mockControlsDisabled}
      />,
    );

    screen.getByText(mockDescription);
  });

  it('Should not render downloadButton without callback prop', () => {
    render(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        controlDisabled={mockControlsDisabled}
      />,
    );

    const foundButton = screen.queryByTestId('download-btn');

    expect(foundButton).toBeNull();
  });

  it('Should call onDownload callback on buttonClick', () => {
    const mockOnDownloadHandler = jest.fn();

    render(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        onDownloadClick={mockOnDownloadHandler}
        controlDisabled={mockControlsDisabled}
      />,
    );

    const downloadBtn = screen.getByTestId('download-btn');
    downloadBtn.click();

    expect(mockOnDownloadHandler).toBeCalled();
  });

  it('Should call on remove callback on remove button click', () => {
    render(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        controlDisabled={mockControlsDisabled}
      />,
    );

    const removeBtn = screen.getByTestId('remove-btn');
    removeBtn.click();

    expect(mockOnRemoveClick).toBeCalled();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DataSubmissionSampleRow
        title={title}
        isLoading={false}
        description={mockDescription}
        onRemoveClick={mockOnRemoveClick}
        controlDisabled={mockControlsDisabled}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
