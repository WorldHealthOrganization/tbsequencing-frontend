import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../../../../../utils/testUtils/jestUtils';
import ResistanceDataControls from '../ResistanceDataControls';

describe('ResistanceDataControls component test', () => {
  const mockOnChangeHandler = jest.fn();

  test('renders ResistanceDataControls component without error', () => {
    render(
      <ResistanceDataControls
        onFileInputChange={mockOnChangeHandler}
      />,
    );
  });

  it('Should render browse button', () => {
    render(
      <ResistanceDataControls
        onFileInputChange={mockOnChangeHandler}
      />,
    );

    screen.getByText('Browse files');
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ResistanceDataControls
        onFileInputChange={mockOnChangeHandler}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
