import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../../../../../utils/testUtils/jestUtils';
import ResistanceDataSamplesHeaderRow from '../ResistanceDataSamplesHeaderRow';

describe('ResistanceDataAccordion component test', () => {
  const mockTitle = 'mockTitle';
  const mockOnExpandClick = jest.fn();
  const mockTotalItems = 10;

  test('renders ResistanceDataAccordion component without error', () => {
    render(
      <ResistanceDataSamplesHeaderRow
        onExpandClick={mockOnExpandClick}
        totalItems={mockTotalItems}
        title={mockTitle}
      />,
    );
  });

  it('Should render title', () => {
    render(
      <ResistanceDataSamplesHeaderRow
        onExpandClick={mockOnExpandClick}
        totalItems={mockTotalItems}
        title={mockTitle}
      />,
    );

    screen.getByText(mockTitle);
  });

  it('Should call on expand click on button click', () => {
    render(
      <ResistanceDataSamplesHeaderRow
        onExpandClick={mockOnExpandClick}
        totalItems={mockTotalItems}
        title={mockTitle}
      />,
    );

    const expandBtn = screen.getByTestId('expand-btn');
    expandBtn.click();

    expect(mockOnExpandClick).toBeCalled();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ResistanceDataSamplesHeaderRow
        onExpandClick={mockOnExpandClick}
        totalItems={mockTotalItems}
        title={mockTitle}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
