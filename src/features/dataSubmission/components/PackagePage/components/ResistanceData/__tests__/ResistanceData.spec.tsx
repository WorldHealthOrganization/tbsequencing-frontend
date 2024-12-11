import React from 'react';
import { getTreeJSONWithRedux, render } from '../../../../../../../utils/testUtils/jestUtils';
import ResistanceData from '../ResistanceData';

describe('ResistanceData component test', () => {
  const mockOnClick = jest.fn();

  test('renders ResistanceData component without error', () => {
    render(
      <ResistanceData
        isLoading={false}
        handleTabChange={mockOnClick}
        onRemoveErrorClick={mockOnClick}
        activeTab="PDST"
        tabs={[{
          value: 'PDST',
          label: 'mock',
        }]}
        samplesData={[]}
        isTabFileUploadError={false}
        errorFileName=""
        onRemoveFileClick={mockOnClick}
      />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ResistanceData
        isLoading={false}
        handleTabChange={mockOnClick}
        onRemoveErrorClick={mockOnClick}
        activeTab="PDST"
        tabs={[{
          value: 'PDST',
          label: 'mock',
        }]}
        samplesData={[]}
        isTabFileUploadError={false}
        errorFileName=""
        onRemoveFileClick={mockOnClick}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
