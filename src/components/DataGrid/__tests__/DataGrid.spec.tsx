import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import DataGrid from '../DataGrid';

import { makeData } from '../makeData';
import { GridType } from '../models';

const defaultData = makeData(10);

const columns = [
  { name: 'geneName', header: 'Gene' },
  { name: 'variantName', header: 'Variant' },
  { name: 'consequence', header: 'Consequence' },
];

const mockDrug = {
  drugId: 1,
  code: 'RIF',
  drugName: 'Rifampicin',
};

const defaultProps = {
  columns,
  dataSource: defaultData,
  selectedDropdownItem: mockDrug,
  type: GridType.Drug,
};

describe('DataGrid component test', () => {
  test('renders DataGrid component without error', () => {
    render(
      <DataGrid {...defaultProps} />,
    );
  });

  test('shows filter on filter button click', () => {
    render(<DataGrid {...defaultProps} />);

    const filterButton = screen.queryByTestId('filter-button-geneName') as HTMLElement;

    expect(filterButton).toBeInTheDocument();
    fireEvent.click(filterButton);

    const filterPopover = screen.queryByLabelText('header-filter-input');

    expect(filterPopover).toBeInTheDocument();
  });

  test('close filter on Enter click', () => {
    render(<DataGrid {...defaultProps} />);

    const filterButton = screen.queryByTestId('filter-button-geneName') as HTMLElement;

    expect(filterButton).toBeInTheDocument();
    fireEvent.click(filterButton);

    const filterInput = screen.queryByLabelText('header-filter-input') as HTMLInputElement;

    fireEvent.keyPress(filterInput, { key: 'Enter', charCode: 13 });

    expect(filterInput).not.toBeInTheDocument();
  });

  it('Should render noDataMessage', () => {
    render(<DataGrid {...defaultProps} dataSource={[]} />);

    screen.getByText('No results matching your request');
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DataGrid {...defaultProps} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
