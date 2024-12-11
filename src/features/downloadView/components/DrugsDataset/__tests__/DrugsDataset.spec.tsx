import React from 'react';
import {
  getTreeJSONWithRedux, render, screen, fireEvent,
} from '../../../../../utils/testUtils/jestUtils';
import DrugsDataset from '../DrugsDataset';
import { IExtendedDrug } from '../../../models';

describe('DrugsDataset', () => {
  const mockDrugsList: IExtendedDrug[] = [
    {
      drugId: 1, drugName: 'Isoniazid', code: 'INH', isChecked: false,
    },
    {
      drugId: 2, drugName: 'Rifampicin', code: 'RIF', isChecked: false,
    },
    {
      drugId: 3, drugName: 'Streptomycin', code: 'STR', isChecked: false,
    },
    {
      drugId: 4, drugName: 'Ethambutol', code: 'EMB', isChecked: false,
    },
    {
      drugId: 5, drugName: 'Capreomycin', code: 'CAP', isChecked: false,
    },
  ];

  const handleChange = jest.fn();
  const handleCheckAll = jest.fn();
  const props = {
    drugsList: mockDrugsList,
    handleChange,
    handleCheckAll,
    mockDate: '2023-04-21',
  };
  test('renders DrugsDataset component without error', () => {
    render(
      <DrugsDataset {...props} />,
    );
  });

  test('calls correct callbacks Download Dataset Type', () => {
    render(
      <DrugsDataset {...props} />,
    );

    const btn = screen.getByText('Select All');
    fireEvent.click(btn);

    expect(handleCheckAll).toHaveBeenCalledTimes(1);
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <DrugsDataset {...props} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
