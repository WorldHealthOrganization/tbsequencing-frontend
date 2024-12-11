import React from 'react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../../../../../utils/testUtils/jestUtils';
import RemoveResistanceFileRow from '../RemoveResistanceFileRow';

describe('RemoveResistanceFileRow component test', () => {
  const mockFileName = 'mockFileName';
  const mockOnRemoveClick = jest.fn();

  test('renders RemoveResistanceFileRow component without error', () => {
    render(
      <RemoveResistanceFileRow fileName={mockFileName} onRemoveClick={mockOnRemoveClick} />,
    );
  });

  it('Should render filename inside row', () => {
    render(
      <RemoveResistanceFileRow fileName={mockFileName} onRemoveClick={mockOnRemoveClick} />,
    );

    screen.getByText(mockFileName);
  });

  it('Should call on remove click callack on button click and render remove button', () => {
    render(
      <RemoveResistanceFileRow fileName={mockFileName} onRemoveClick={mockOnRemoveClick} />,
    );

    const removeBtn = screen.getByTestId('remove-btn');
    removeBtn.click();

    expect(mockOnRemoveClick).toBeCalled();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <RemoveResistanceFileRow fileName={mockFileName} onRemoveClick={mockOnRemoveClick} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
