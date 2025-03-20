import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../utils/testUtils/jestUtils';
import HeaderFilter from '../HeaderFilter';
import { GridType } from '../models';

describe('HeaderFilter', () => {
  const { container } = render(<div id="header-filter-wrapper" />);
  const closeDropDown = jest.fn();
  const applyFilter = jest.fn();

  test('properly handle initial header filter value', () => {
    render(<HeaderFilter
      type={GridType.Drug}
      anchorEl={container}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[{ id: 'geneName', value: 'rpoC' }]}
      onApplyFilter={applyFilter}
    />);

    const result = screen.getByDisplayValue('rpoC');

    expect(result).toBeInTheDocument();
  });

  test('properly handle clear button', () => {
    render(<HeaderFilter
      anchorEl={container}
      type={GridType.Drug}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[{ id: 'geneName', value: 'rpoC' }]}
      onApplyFilter={applyFilter}
    />);

    const closeButton = screen.getByTestId('clear-filter-icon');

    fireEvent.click(closeButton);

    expect(closeDropDown).toHaveBeenCalled();
    expect(applyFilter).toHaveBeenCalled();
  });

  test('properly renders recently filters list', () => {
    const { rerender } = render(<HeaderFilter
      type={GridType.Drug}
      anchorEl={container}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[{ id: 'geneName', value: 'initialFilterValue' }]}
      onApplyFilter={applyFilter}
    />);

    let filterInput = screen.getByDisplayValue('initialFilterValue') as HTMLInputElement;
    let filterContainer = screen.queryByLabelText('header-filter-input') as HTMLElement;

    fireEvent.change(filterInput, { target: { value: 'rpoB' } });
    fireEvent.keyPress(filterContainer, { key: 'Enter', charCode: 13 });

    rerender(<HeaderFilter
      anchorEl={container}
      type={GridType.Drug}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[{ id: 'geneName', value: 'rpoB' }]}
      onApplyFilter={applyFilter}
    />);

    filterInput = screen.getByDisplayValue('rpoB') as HTMLInputElement;
    filterContainer = screen.queryByLabelText('header-filter-input') as HTMLElement;

    fireEvent.change(filterInput, { target: { value: 'rpoA' } });
    fireEvent.keyPress(filterContainer, { key: 'Enter', charCode: 13 });

    rerender(<HeaderFilter
      anchorEl={container}
      type={GridType.Drug}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[]}
      onApplyFilter={applyFilter}
    />);

  });

  test('renders recent filters without duplicates', () => {
    const { rerender } = render(<HeaderFilter
      anchorEl={container}
      type={GridType.Drug}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[{ id: 'geneName', value: 'initialFilterValue' }]}
      onApplyFilter={applyFilter}
    />);

    let filterInput = screen.getByDisplayValue('initialFilterValue') as HTMLInputElement;
    let filterContainer = screen.queryByLabelText('header-filter-input') as HTMLElement;

    fireEvent.change(filterInput, { target: { value: 'rpoB' } });
    fireEvent.keyPress(filterContainer, { key: 'Enter', charCode: 13 });

    rerender(<HeaderFilter
      anchorEl={container}
      type={GridType.Drug}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[{ id: 'geneName', value: 'rpoB' }]}
      onApplyFilter={applyFilter}
    />);

    filterInput = screen.getByDisplayValue('rpoB') as HTMLInputElement;
    filterContainer = screen.queryByLabelText('header-filter-input') as HTMLElement;

    fireEvent.change(filterInput, { target: { value: 'rpoB' } });
    fireEvent.keyPress(filterContainer, { key: 'Enter', charCode: 13 });

    rerender(<HeaderFilter
      anchorEl={container}
      type={GridType.Drug}
      closeDropDown={closeDropDown}
      columnData={{ id: 'geneName' }}
      columnFilters={[]}
      onApplyFilter={applyFilter}
    />);
  });
});
