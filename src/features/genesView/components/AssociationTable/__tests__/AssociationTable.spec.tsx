import React from 'react';
import { fireEvent } from '@testing-library/react';
import { getTreeJSONWithRedux, render, screen } from '../../../../../utils/testUtils/jestUtils';
import AssociationTable, { LeftColumnButton } from '../AssociationTable';
import { formatResistantData } from '../../GenesView/utils';
import { association } from '../mock';
import { GeneAssociationData } from '../../../../../services/drugsApi/models';

const mockData = formatResistantData(association as GeneAssociationData[]);

describe('AssociationTable', () => {
  const mockOnClick = jest.fn();
  test('renders AssociationTable component without error', () => {
    render(
      <AssociationTable
        tableHeader="Table header"
        data={mockData}
        isLoading={false}
      />,
    );
  });

  test('calls onClick function on click', () => {
    render(
      <AssociationTable
        tableHeader="Table header"
        data={mockData}
        leftColumnItemComponent={LeftColumnButton}
        onClick={mockOnClick}
        isLoading={false}
      />,
    );

    const clickItem = screen.getByText('rpoB');

    expect(clickItem).toBeInTheDocument();

    fireEvent.click(clickItem);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test('Should render correctly', () => {
    const tree = getTreeJSONWithRedux(
      <AssociationTable tableHeader="Table header" data={mockData} isLoading={false} />,
    );

    expect(tree).toMatchSnapshot();
  });
});
