import React from 'react';
import { fireEvent } from '@testing-library/react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../../../utils/testUtils/jestUtils';
import SequencingData from '../SequencingData';
import type { ISequencingFile, IVerdict } from '../../../../../../../services/submissionApi/models';
import { ISequencingData } from '../../../../../../../services/submissionApi/models';

describe('SequencingData component test', () => {
  const mockCreatedAt = '2022-09-07T14:11:31.336874Z';
  const mockVerdict: IVerdict = {
    verdict: 'mock',
    level: 'info',
  };

  const mockSampleData: ISequencingData = {
    libraryName: 'mock',
    pk: 0,
    filePath: 'mock',
    dataLocation: 'mock',
    fileName: 'mock',
  };

  const mockData: ISequencingFile[] = [
    {
      filename: 'mockName0',
      isLoading: false,
      isError: false,
      fileSize: 0,
      createdAt: mockCreatedAt,
      verdicts: [mockVerdict],
      sequencingData: mockSampleData,
    },
    {
      filename: 'mockName1',
      isLoading: false,
      isError: false,
      fileSize: 0,
      createdAt: mockCreatedAt,
      verdicts: [mockVerdict],
      sequencingData: mockSampleData,
    },
  ];
  const mockOnChange = jest.fn();
  const componentProps = {
    onFileInputChange: mockOnChange, sequencingDataFiles: mockData, controlsDisabled: false,
  };

  test('renders SequencingData component without error', () => {
    render(
      <SequencingData {...componentProps} />,
    );
  });

  it('Should render rows properly', () => {
    render(
      <SequencingData {...componentProps} />,
    );

    screen.getByText('mockName0');
    screen.getByText('mockName1');
  });

  it('Should call onChange handler on fileInput change', async () => {
    render(
      <SequencingData {...componentProps} />,
    );

    const fileInput = screen.getByTestId('fileInput');

    fireEvent.change(fileInput);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('Should not render rows in case of empty or missing data', () => {
    render(
      <SequencingData
        controlsDisabled={false}
        onFileInputChange={mockOnChange}
        sequencingDataFiles={undefined}
      />,
    );

    const foundElement = screen.queryByText('mock');

    expect(foundElement).toBeNull();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <SequencingData {...componentProps} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
