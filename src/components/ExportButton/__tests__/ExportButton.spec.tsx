import React from 'react';
import { render, getTreeJSONWithRedux } from '../../../utils/testUtils/jestUtils';
import ExportButton from '../ExportButton';

const mockDrug = {
  drugId: 1,
  code: 'RIF',
  drugName: 'Rifampicin',
};

describe('ExportButton component test', () => {
  test('renders ExportButton component without error', () => {
    render(
      <ExportButton columnFilters={[]} headers={[{ label: 'Label', key: 'ley' }]} selectedDropdownItem={mockDrug} />,
    );
  });

  it('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <ExportButton columnFilters={[]} headers={[{ label: 'Label', key: 'ley' }]} selectedDropdownItem={mockDrug} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
