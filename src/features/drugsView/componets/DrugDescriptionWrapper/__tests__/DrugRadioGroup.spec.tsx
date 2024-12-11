import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, fireEvent,
} from '../../../../../utils/testUtils/jestUtils';
import DrugsRadioGroup from '../DrugsRadioGroup';
import { IDrug } from '../../../../../services/drugsApi/models';

describe('DrugsRadioGroup', () => {
  const mockItems: IDrug[] = [
    { drugName: 'Rifampicin', drugId: 1, code: 'RIF' },
    { drugName: 'MockDrug', drugId: 1, code: 'MOC' },
    { drugName: 'DrugMock', drugId: 1, code: 'DRU' },
  ];
  const mockOnChange = jest.fn();
  test('renders DrugsRadioGroup component without error', () => {
    render(
      <DrugsRadioGroup onChange={mockOnChange} selectedItem={mockItems[0]} items={mockItems} />,
    );
  });

  test('renders active radio for selectedItem', () => {
    render(
      <DrugsRadioGroup onChange={mockOnChange} selectedItem={mockItems[0]} items={mockItems} />,
    );

    const drug = screen.getByLabelText('Rifampicin') as HTMLInputElement;

    expect(drug).toBeChecked();
  });

  test('calls onChange cb on drug click', async () => {
    render(
      <DrugsRadioGroup onChange={mockOnChange} selectedItem={mockItems[0]} items={mockItems} />,
    );

    const drug = screen.getByLabelText('MockDrug');

    fireEvent.click(drug);

    expect(drug).toBeChecked();
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DrugsRadioGroup onChange={mockOnChange} selectedItem={mockItems[0]} items={mockItems} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
