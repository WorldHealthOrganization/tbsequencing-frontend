import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, fireEvent,
} from '../../../utils/testUtils/jestUtils';
import AutocompleteInput from '../AutocompleteInput';
import { IGene } from '../../../services/genesApi/models';

const mockGene: IGene = {
  endPos: 0,
  id: 0,
  locusTag: 'RV00123',
  startPos: 0,
  strand: -1,
  geneName: 'rpoC',
  geneDbCrossrefId: 114,
};

const mockOptions: IGene[] = [
  mockGene,
  {
    endPos: 0,
    id: 0,
    locusTag: 'RV00124',
    startPos: 0,
    strand: -1,
    geneName: 'rpoB',
    geneDbCrossrefId: 118,
  },
];

describe('AutocompleteInput component test', () => {
  const mockOnChange = jest.fn();
  const mockOnSelectionChange = jest.fn();

  test('renders AutocompleteInput component without error', () => {
    render(
      <AutocompleteInput
        isLoading={false}
        onSelectionChanged={mockOnSelectionChange}
        onChange={mockOnChange}
        value="mock"
        selectedValue={mockGene}
        options={mockOptions}
        style={{}}
      />,
    );
  });

  test('handles onChange event', () => {
    render(<AutocompleteInput
      isLoading={false}
      onSelectionChanged={mockOnSelectionChange}
      onChange={mockOnChange}
      value="RV00123"
      selectedValue={mockGene}
      options={mockOptions}
      style={{}}
    />);

    const input = screen.getByDisplayValue('RV00123');

    fireEvent.change(input, { target: { value: '123' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('handles onSelectionChange event', async () => {
    render(<AutocompleteInput
      isLoading={false}
      onSelectionChanged={mockOnSelectionChange}
      onChange={mockOnChange}
      value="RV00"
      selectedValue={mockGene}
      options={mockOptions}
      style={{}}
    />);

    const container = screen.getByTestId('autocomplete');
    fireEvent.click(container);
    fireEvent.focus(container);

    const input = screen.getByDisplayValue('RV00123');

    fireEvent.change(input, { target: { value: 'RV00124' } });

    const dropDownOption = await screen.findByText('RV00124');

    fireEvent.click(dropDownOption);

    expect(mockOnSelectionChange).toHaveBeenCalled();
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AutocompleteInput
        isLoading={false}
        onSelectionChanged={mockOnSelectionChange}
        onChange={mockOnChange}
        value="mock"
        selectedValue={mockGene}
        options={[mockGene]}
        style={{}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
